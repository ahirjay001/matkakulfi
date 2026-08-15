"""
Comprehensive Backend API Tests for Desi Mastaani
Tests all endpoints, validation, honeypot, and MongoDB persistence
"""
import requests
import sys
from datetime import datetime
from pymongo import MongoClient
import os

BASE_URL = "https://kulfi-heritage-brand.preview.emergentagent.com/api"

class DesiMastaaniAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        # MongoDB connection for persistence checks
        try:
            self.mongo_client = MongoClient("mongodb://localhost:27017", serverSelectionTimeoutMS=5000)
            self.db = self.mongo_client["test_database"]
            self.mongo_available = True
            print("✅ MongoDB connection established")
        except Exception as e:
            print(f"⚠️  MongoDB connection failed: {e}")
            self.mongo_available = False

    def log_result(self, test_name, passed, expected, actual, details=""):
        """Log test result"""
        self.tests_run += 1
        if passed:
            self.tests_passed += 1
            print(f"✅ PASS: {test_name}")
            if details:
                print(f"   {details}")
        else:
            self.failed_tests.append({
                "test": test_name,
                "expected": expected,
                "actual": actual,
                "details": details
            })
            print(f"❌ FAIL: {test_name}")
            print(f"   Expected: {expected}")
            print(f"   Actual: {actual}")
            if details:
                print(f"   Details: {details}")

    def test_root_endpoint(self):
        """Test GET /api/"""
        print("\n🔍 Testing Root Endpoint...")
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            passed = response.status_code == 200 and "message" in response.json()
            self.log_result(
                "GET /api/ - Root endpoint",
                passed,
                "200 with message field",
                f"{response.status_code} - {response.json() if passed else response.text}"
            )
            return passed
        except Exception as e:
            self.log_result("GET /api/ - Root endpoint", False, "200", f"Exception: {str(e)}")
            return False

    def test_flavours_endpoint(self):
        """Test GET /api/flavours - should return 10 flavours"""
        print("\n🔍 Testing Flavours Endpoint...")
        try:
            response = requests.get(f"{self.base_url}/flavours", timeout=10)
            if response.status_code != 200:
                self.log_result("GET /api/flavours - Status", False, "200", response.status_code)
                return False
            
            data = response.json()
            flavours = data.get("flavours", [])
            
            # Check count
            count_passed = len(flavours) == 10
            self.log_result(
                "GET /api/flavours - Count",
                count_passed,
                "10 flavours",
                f"{len(flavours)} flavours"
            )
            
            # Check structure of first flavour
            if flavours:
                first = flavours[0]
                required_fields = ["id", "name", "tagline", "description", "badge", "color", "image"]
                has_all_fields = all(field in first for field in required_fields)
                self.log_result(
                    "GET /api/flavours - Structure",
                    has_all_fields,
                    f"All fields: {required_fields}",
                    f"Fields present: {list(first.keys())}"
                )
                return count_passed and has_all_fields
            return count_passed
        except Exception as e:
            self.log_result("GET /api/flavours", False, "Success", f"Exception: {str(e)}")
            return False

    def test_locations_endpoint(self):
        """Test GET /api/locations - should return 37 cities, total_outlets=120"""
        print("\n🔍 Testing Locations Endpoint...")
        try:
            response = requests.get(f"{self.base_url}/locations", timeout=10)
            if response.status_code != 200:
                self.log_result("GET /api/locations - Status", False, "200", response.status_code)
                return False
            
            data = response.json()
            locations = data.get("locations", [])
            total_outlets = data.get("total_outlets", 0)
            total_cities = data.get("total_cities", 0)
            
            # Check total outlets
            outlets_passed = total_outlets == 120
            self.log_result(
                "GET /api/locations - Total Outlets",
                outlets_passed,
                "120",
                total_outlets
            )
            
            # Check total cities
            cities_passed = total_cities == 37
            self.log_result(
                "GET /api/locations - Total Cities",
                cities_passed,
                "37",
                total_cities
            )
            
            # Check actual locations count
            count_passed = len(locations) == 37
            self.log_result(
                "GET /api/locations - Locations Count",
                count_passed,
                "37 locations",
                f"{len(locations)} locations"
            )
            
            return outlets_passed and cities_passed and count_passed
        except Exception as e:
            self.log_result("GET /api/locations", False, "Success", f"Exception: {str(e)}")
            return False

    def test_locations_query_filter(self):
        """Test GET /api/locations?q=raj - should filter correctly"""
        print("\n🔍 Testing Locations Query Filter...")
        try:
            response = requests.get(f"{self.base_url}/locations?q=raj", timeout=10)
            if response.status_code != 200:
                self.log_result("GET /api/locations?q=raj - Status", False, "200", response.status_code)
                return False
            
            data = response.json()
            locations = data.get("locations", [])
            cities = [loc["city"] for loc in locations]
            
            # Should include Rajkot
            has_rajkot = "Rajkot" in cities
            self.log_result(
                "GET /api/locations?q=raj - Contains Rajkot",
                has_rajkot,
                "Rajkot in results",
                f"Cities: {cities}"
            )
            
            # All cities should contain 'raj' in city/region/areas
            all_match = all(
                "raj" in loc["city"].lower() or 
                "raj" in loc["region"].lower() or 
                any("raj" in area.lower() for area in loc["areas"])
                for loc in locations
            )
            self.log_result(
                "GET /api/locations?q=raj - All match filter",
                all_match,
                "All results contain 'raj'",
                f"Results: {len(locations)}"
            )
            
            return has_rajkot and all_match
        except Exception as e:
            self.log_result("GET /api/locations?q=raj", False, "Success", f"Exception: {str(e)}")
            return False

    def test_locations_region_filter(self):
        """Test GET /api/locations?region=Saurashtra"""
        print("\n🔍 Testing Locations Region Filter...")
        try:
            response = requests.get(f"{self.base_url}/locations?region=Saurashtra", timeout=10)
            if response.status_code != 200:
                self.log_result("GET /api/locations?region=Saurashtra - Status", False, "200", response.status_code)
                return False
            
            data = response.json()
            locations = data.get("locations", [])
            
            # All should be Saurashtra region
            all_saurashtra = all(loc["region"] == "Saurashtra" for loc in locations)
            self.log_result(
                "GET /api/locations?region=Saurashtra",
                all_saurashtra,
                "All Saurashtra region",
                f"{len(locations)} locations, regions: {set(loc['region'] for loc in locations)}"
            )
            
            return all_saurashtra
        except Exception as e:
            self.log_result("GET /api/locations?region=Saurashtra", False, "Success", f"Exception: {str(e)}")
            return False

    def test_locations_combined_filter(self):
        """Test GET /api/locations?q=raj&region=Saurashtra"""
        print("\n🔍 Testing Locations Combined Filter...")
        try:
            response = requests.get(f"{self.base_url}/locations?q=raj&region=Saurashtra", timeout=10)
            if response.status_code != 200:
                self.log_result("GET /api/locations?q=raj&region=Saurashtra - Status", False, "200", response.status_code)
                return False
            
            data = response.json()
            locations = data.get("locations", [])
            
            # Should have Rajkot (Saurashtra region)
            has_rajkot = any(loc["city"] == "Rajkot" for loc in locations)
            all_saurashtra = all(loc["region"] == "Saurashtra" for loc in locations)
            
            passed = has_rajkot and all_saurashtra
            self.log_result(
                "GET /api/locations?q=raj&region=Saurashtra",
                passed,
                "Rajkot in Saurashtra results",
                f"Cities: {[loc['city'] for loc in locations]}"
            )
            
            return passed
        except Exception as e:
            self.log_result("GET /api/locations?q=raj&region=Saurashtra", False, "Success", f"Exception: {str(e)}")
            return False

    def test_franchise_enquiry_valid(self):
        """Test POST /api/franchise-enquiry with valid data"""
        print("\n🔍 Testing Franchise Enquiry - Valid Data...")
        try:
            timestamp = datetime.now().strftime("%H%M%S")
            payload = {
                "name": f"Test Partner {timestamp}",
                "phone": "9876543210",
                "email": f"partner{timestamp}@test.com",
                "city": "Rajkot",
                "message": "Test franchise enquiry"
            }
            
            response = requests.post(f"{self.base_url}/franchise-enquiry", json=payload, timeout=10)
            
            if response.status_code != 200:
                self.log_result(
                    "POST /api/franchise-enquiry - Valid data",
                    False,
                    "200",
                    f"{response.status_code} - {response.text}"
                )
                return False
            
            data = response.json()
            success = data.get("success", False)
            has_id = "id" in data
            has_message = "message" in data and "Shukriya" in data["message"]
            
            passed = success and has_id and has_message
            self.log_result(
                "POST /api/franchise-enquiry - Valid data",
                passed,
                "success=True with id and Hinglish message",
                f"Response: {data}"
            )
            
            # Check MongoDB persistence
            if self.mongo_available and passed:
                doc_id = data["id"]
                doc = self.db.franchise_enquiries.find_one({"id": doc_id})
                persisted = doc is not None
                self.log_result(
                    "POST /api/franchise-enquiry - MongoDB persistence",
                    persisted,
                    "Document stored in franchise_enquiries",
                    f"Found: {persisted}"
                )
                return passed and persisted
            
            return passed
        except Exception as e:
            self.log_result("POST /api/franchise-enquiry - Valid", False, "Success", f"Exception: {str(e)}")
            return False

    def test_franchise_enquiry_invalid(self):
        """Test POST /api/franchise-enquiry with invalid phone and email"""
        print("\n🔍 Testing Franchise Enquiry - Invalid Data...")
        try:
            payload = {
                "name": "Test Partner",
                "phone": "123",  # Invalid - too short
                "email": "invalid-email",  # Invalid format
                "city": "Rajkot",
                "message": "Test"
            }
            
            response = requests.post(f"{self.base_url}/franchise-enquiry", json=payload, timeout=10)
            
            # Should return 422 validation error
            passed = response.status_code == 422
            self.log_result(
                "POST /api/franchise-enquiry - Invalid data",
                passed,
                "422 validation error",
                f"{response.status_code} - {response.text[:200]}"
            )
            
            return passed
        except Exception as e:
            self.log_result("POST /api/franchise-enquiry - Invalid", False, "422", f"Exception: {str(e)}")
            return False

    def test_contact_enquiry_valid(self):
        """Test POST /api/contact with valid data"""
        print("\n🔍 Testing Contact Enquiry - Valid Data...")
        try:
            timestamp = datetime.now().strftime("%H%M%S")
            payload = {
                "name": f"Test User {timestamp}",
                "email": f"user{timestamp}@test.com",
                "message": "This is a test contact message"
            }
            
            response = requests.post(f"{self.base_url}/contact", json=payload, timeout=10)
            
            if response.status_code != 200:
                self.log_result(
                    "POST /api/contact - Valid data",
                    False,
                    "200",
                    f"{response.status_code} - {response.text}"
                )
                return False
            
            data = response.json()
            success = data.get("success", False)
            has_id = "id" in data
            has_message = "message" in data and "Shukriya" in data["message"]
            
            passed = success and has_id and has_message
            self.log_result(
                "POST /api/contact - Valid data",
                passed,
                "success=True with id and Hinglish message",
                f"Response: {data}"
            )
            
            # Check MongoDB persistence
            if self.mongo_available and passed:
                doc_id = data["id"]
                doc = self.db.contact_enquiries.find_one({"id": doc_id})
                persisted = doc is not None
                self.log_result(
                    "POST /api/contact - MongoDB persistence",
                    persisted,
                    "Document stored in contact_enquiries",
                    f"Found: {persisted}"
                )
                return passed and persisted
            
            return passed
        except Exception as e:
            self.log_result("POST /api/contact - Valid", False, "Success", f"Exception: {str(e)}")
            return False

    def test_contact_enquiry_invalid(self):
        """Test POST /api/contact with invalid email"""
        print("\n🔍 Testing Contact Enquiry - Invalid Email...")
        try:
            payload = {
                "name": "Test User",
                "email": "not-an-email",  # Invalid
                "message": "Test message"
            }
            
            response = requests.post(f"{self.base_url}/contact", json=payload, timeout=10)
            
            # Should return 422 validation error
            passed = response.status_code == 422
            self.log_result(
                "POST /api/contact - Invalid email",
                passed,
                "422 validation error",
                f"{response.status_code} - {response.text[:200]}"
            )
            
            return passed
        except Exception as e:
            self.log_result("POST /api/contact - Invalid", False, "422", f"Exception: {str(e)}")
            return False

    def test_honeypot_franchise(self):
        """Test honeypot - POST franchise with website field should not store"""
        print("\n🔍 Testing Honeypot - Franchise Enquiry...")
        try:
            timestamp = datetime.now().strftime("%H%M%S")
            payload = {
                "name": f"Spambot {timestamp}",
                "phone": "9876543210",
                "email": f"spam{timestamp}@bot.com",
                "city": "Spam City",
                "message": "Spam message",
                "website": "spambot.com"  # Honeypot field
            }
            
            response = requests.post(f"{self.base_url}/franchise-enquiry", json=payload, timeout=10)
            
            if response.status_code != 200:
                self.log_result(
                    "POST /api/franchise-enquiry - Honeypot returns success",
                    False,
                    "200",
                    response.status_code
                )
                return False
            
            data = response.json()
            returns_success = data.get("success", False)
            
            self.log_result(
                "POST /api/franchise-enquiry - Honeypot returns success",
                returns_success,
                "success=True",
                f"Response: {data}"
            )
            
            # Check that it was NOT stored in MongoDB
            if self.mongo_available and returns_success:
                doc_id = data["id"]
                doc = self.db.franchise_enquiries.find_one({"id": doc_id})
                not_stored = doc is None
                self.log_result(
                    "POST /api/franchise-enquiry - Honeypot NOT stored",
                    not_stored,
                    "Document NOT in database",
                    f"Found in DB: {doc is not None}"
                )
                return returns_success and not_stored
            
            return returns_success
        except Exception as e:
            self.log_result("POST /api/franchise-enquiry - Honeypot", False, "Success", f"Exception: {str(e)}")
            return False

    def test_honeypot_contact(self):
        """Test honeypot - POST contact with website field should not store"""
        print("\n🔍 Testing Honeypot - Contact Enquiry...")
        try:
            timestamp = datetime.now().strftime("%H%M%S")
            payload = {
                "name": f"Spambot {timestamp}",
                "email": f"spam{timestamp}@bot.com",
                "message": "Spam message",
                "website": "spambot.com"  # Honeypot field
            }
            
            response = requests.post(f"{self.base_url}/contact", json=payload, timeout=10)
            
            if response.status_code != 200:
                self.log_result(
                    "POST /api/contact - Honeypot returns success",
                    False,
                    "200",
                    response.status_code
                )
                return False
            
            data = response.json()
            returns_success = data.get("success", False)
            
            self.log_result(
                "POST /api/contact - Honeypot returns success",
                returns_success,
                "success=True",
                f"Response: {data}"
            )
            
            # Check that it was NOT stored in MongoDB
            if self.mongo_available and returns_success:
                doc_id = data["id"]
                doc = self.db.contact_enquiries.find_one({"id": doc_id})
                not_stored = doc is None
                self.log_result(
                    "POST /api/contact - Honeypot NOT stored",
                    not_stored,
                    "Document NOT in database",
                    f"Found in DB: {doc is not None}"
                )
                return returns_success and not_stored
            
            return returns_success
        except Exception as e:
            self.log_result("POST /api/contact - Honeypot", False, "Success", f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 80)
        print("🚀 DESI MASTAANI BACKEND API TESTS")
        print("=" * 80)
        print(f"Base URL: {self.base_url}")
        print(f"MongoDB: {'Connected' if self.mongo_available else 'Not available'}")
        print("=" * 80)
        
        # Run all tests
        self.test_root_endpoint()
        self.test_flavours_endpoint()
        self.test_locations_endpoint()
        self.test_locations_query_filter()
        self.test_locations_region_filter()
        self.test_locations_combined_filter()
        self.test_franchise_enquiry_valid()
        self.test_franchise_enquiry_invalid()
        self.test_contact_enquiry_valid()
        self.test_contact_enquiry_invalid()
        self.test_honeypot_franchise()
        self.test_honeypot_contact()
        
        # Print summary
        print("\n" + "=" * 80)
        print("📊 TEST SUMMARY")
        print("=" * 80)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed} ✅")
        print(f"Failed: {len(self.failed_tests)} ❌")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for fail in self.failed_tests:
                print(f"\n  • {fail['test']}")
                print(f"    Expected: {fail['expected']}")
                print(f"    Actual: {fail['actual']}")
                if fail['details']:
                    print(f"    Details: {fail['details']}")
        
        print("=" * 80)
        
        # Close MongoDB connection
        if self.mongo_available:
            self.mongo_client.close()
        
        return 0 if len(self.failed_tests) == 0 else 1


if __name__ == "__main__":
    tester = DesiMastaaniAPITester()
    sys.exit(tester.run_all_tests())
