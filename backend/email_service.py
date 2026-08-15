"""
SMTP email delivery for enquiry forms.
Gracefully no-ops when SMTP credentials are placeholders — submissions are
ALWAYS stored in MongoDB regardless, so nothing is ever lost.
Fill real values in /app/backend/.env (SMTP_HOST, SMTP_PORT, SMTP_USER,
SMTP_PASSWORD, SMTP_FROM, ENQUIRY_RECIPIENT_EMAIL) to enable email delivery.
"""
import os
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logger = logging.getLogger(__name__)

_PLACEHOLDER_MARKERS = ("placeholder", "your-", "changeme", "example.com")


def smtp_configured() -> bool:
    host = os.environ.get("SMTP_HOST", "")
    user = os.environ.get("SMTP_USER", "")
    pwd = os.environ.get("SMTP_PASSWORD", "")
    recipient = os.environ.get("ENQUIRY_RECIPIENT_EMAIL", "")
    if not (host and user and pwd and recipient):
        return False
    for value in (host, user, pwd, recipient):
        low = value.lower()
        if any(marker in low for marker in _PLACEHOLDER_MARKERS):
            return False
    return True


def _build_html(title: str, fields: dict) -> str:
    rows = "".join(
        f"<tr><td style='padding:8px 12px;border:1px solid #eee;font-weight:bold;"
        f"background:#FFF3D6;color:#3A0B1E'>{k}</td>"
        f"<td style='padding:8px 12px;border:1px solid #eee;color:#1A1208'>{v}</td></tr>"
        for k, v in fields.items() if v
    )
    return (
        f"<div style='font-family:Arial,sans-serif;max-width:560px'>"
        f"<h2 style='color:#E46A12'>{title}</h2>"
        f"<table style='border-collapse:collapse;width:100%'>{rows}</table>"
        f"<p style='color:#888;font-size:12px;margin-top:16px'>"
        f"Sent from the Desi Mastaani website. This enquiry is also saved in the database.</p></div>"
    )


def send_enquiry_email(subject: str, title: str, fields: dict) -> bool:
    """Send enquiry email synchronously (called via BackgroundTasks threadpool).
    Returns True if sent, False if skipped/failed. Never raises."""
    try:
        if not smtp_configured():
            logger.info(
                "SMTP not configured (placeholder credentials) - '%s' stored in "
                "database only. Update SMTP_* values in /app/backend/.env to "
                "enable email delivery.", subject
            )
            return False

        host = os.environ["SMTP_HOST"]
        port = int(os.environ.get("SMTP_PORT", "587"))
        user = os.environ["SMTP_USER"]
        password = os.environ["SMTP_PASSWORD"]
        sender = os.environ.get("SMTP_FROM", user)
        recipient = os.environ["ENQUIRY_RECIPIENT_EMAIL"]

        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = sender
        msg["To"] = recipient
        text_body = "\n".join(f"{k}: {v}" for k, v in fields.items() if v)
        msg.attach(MIMEText(text_body, "plain"))
        msg.attach(MIMEText(_build_html(title, fields), "html"))

        with smtplib.SMTP(host, port, timeout=20) as server:
            server.ehlo()
            try:
                server.starttls()
                server.ehlo()
            except smtplib.SMTPNotSupportedError:
                pass
            server.login(user, password)
            server.sendmail(sender, [recipient], msg.as_string())
        logger.info("Enquiry email sent successfully: %s", subject)
        return True
    except Exception as exc:  # noqa: BLE001
        logger.error("SMTP send failed (%s) - enquiry is safely stored in MongoDB.", exc)
        return False
