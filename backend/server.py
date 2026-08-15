from fastapi import FastAPI, APIRouter, BackgroundTasks, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from data import FLAVOURS, GUJARAT_LOCATIONS, TOTAL_OUTLETS
from email_service import send_enquiry_email, smtp_configured

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Desi Mastaani API")
api_router = APIRouter(prefix="/api")

PHONE_RE = re.compile(r"^[+]?[\d\s\-()]{10,15}$")
EMAIL_RE = re.compile(r"^[\w.+-]+@[\w-]+\.[\w.-]+$")


# ---------- Models ----------
class FranchiseEnquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    phone: str = Field(min_length=10, max_length=16)
    email: str = Field(max_length=120)
    city: str = Field(min_length=2, max_length=100)
    message: Optional[str] = Field(default="", max_length=2000)
    website: Optional[str] = Field(default="", max_length=200)  # honeypot

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        if not PHONE_RE.match(v.strip()):
            raise ValueError("Please enter a valid phone number (10-15 digits).")
        return v.strip()

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        if not EMAIL_RE.match(v.strip()):
            raise ValueError("Please enter a valid email address.")
        return v.strip().lower()


class ContactEnquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: str = Field(max_length=120)
    phone: Optional[str] = Field(default="", max_length=16)
    message: str = Field(min_length=5, max_length=2000)
    website: Optional[str] = Field(default="", max_length=200)  # honeypot

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        if not EMAIL_RE.match(v.strip()):
            raise ValueError("Please enter a valid email address.")
        return v.strip().lower()

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        v = (v or "").strip()
        if v and not PHONE_RE.match(v):
            raise ValueError("Please enter a valid phone number (10-15 digits).")
        return v


class EnquiryResponse(BaseModel):
    success: bool
    id: str
    message: str


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Desi Mastaani API - Banaye Meethi Yaadein", "smtp_configured": smtp_configured()}


@api_router.get("/flavours")
async def get_flavours():
    return {"flavours": FLAVOURS}


@api_router.get("/locations")
async def get_locations(q: Optional[str] = None, region: Optional[str] = None):
    results = GUJARAT_LOCATIONS
    if region and region.lower() != "all":
        results = [l for l in results if l["region"].lower() == region.lower()]
    if q:
        needle = q.strip().lower()
        results = [
            l for l in results
            if needle in l["city"].lower()
            or needle in l["region"].lower()
            or any(needle in a.lower() for a in l["areas"])
        ]
    return {
        "locations": results,
        "total_outlets": TOTAL_OUTLETS,
        "total_cities": len(GUJARAT_LOCATIONS),
    }


@api_router.post("/franchise-enquiry", response_model=EnquiryResponse)
async def create_franchise_enquiry(payload: FranchiseEnquiryCreate, background_tasks: BackgroundTasks):
    # Honeypot: bots fill hidden 'website' field - silently accept, don't store
    if payload.website:
        return EnquiryResponse(success=True, id=str(uuid.uuid4()), message="Shukriya! Hum jald hi aapse contact karenge.")

    doc = {
        "id": str(uuid.uuid4()),
        "type": "franchise",
        "name": payload.name.strip(),
        "phone": payload.phone,
        "email": payload.email,
        "city": payload.city.strip(),
        "message": (payload.message or "").strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.franchise_enquiries.insert_one({**doc})

    background_tasks.add_task(
        send_enquiry_email,
        f"New Franchise Enquiry - {doc['name']} ({doc['city']})",
        "New Franchise Enquiry - Desi Mastaani",
        {
            "Name": doc["name"],
            "Phone": doc["phone"],
            "Email": doc["email"],
            "City of Interest": doc["city"],
            "Message": doc["message"],
            "Received At": doc["created_at"],
        },
    )
    return EnquiryResponse(
        success=True,
        id=doc["id"],
        message="Shukriya! Aapki franchise enquiry mil gayi hai. Hamari team 24-48 hours mein aapse contact karegi.",
    )


@api_router.post("/contact", response_model=EnquiryResponse)
async def create_contact_enquiry(payload: ContactEnquiryCreate, background_tasks: BackgroundTasks):
    if payload.website:
        return EnquiryResponse(success=True, id=str(uuid.uuid4()), message="Shukriya! Message mil gaya.")

    doc = {
        "id": str(uuid.uuid4()),
        "type": "contact",
        "name": payload.name.strip(),
        "email": payload.email,
        "phone": (payload.phone or "").strip(),
        "message": payload.message.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.contact_enquiries.insert_one({**doc})

    background_tasks.add_task(
        send_enquiry_email,
        f"New Contact Message - {doc['name']}",
        "New Contact Message - Desi Mastaani",
        {
            "Name": doc["name"],
            "Email": doc["email"],
            "Phone": doc["phone"],
            "Message": doc["message"],
            "Received At": doc["created_at"],
        },
    )
    return EnquiryResponse(
        success=True,
        id=doc["id"],
        message="Shukriya! Aapka message mil gaya hai. Hum jald hi reply karenge.",
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
