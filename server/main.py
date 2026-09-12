from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse


app = FastAPI(
    title="India Post Accessibility Audit API",
    description="Backend API for website accessibility auditing",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AuditRequest(BaseModel):
    url: str


def validate_url(url: str):
    parsed = urlparse(url)

    if parsed.scheme not in ["http", "https"] or not parsed.netloc:
        raise HTTPException(
            status_code=400,
            detail="Please provide a valid HTTP or HTTPS URL.",
        )


def run_basic_audit(url: str):
    try:
        response = requests.get(
            url,
            timeout=10,
            headers={
                "User-Agent": "India-Post-Accessibility-Audit/1.0"
            },
        )

        response.raise_for_status()

    except requests.RequestException as error:
        raise HTTPException(
            status_code=400,
            detail=f"Unable to access the website: {error}",
        )

    soup = BeautifulSoup(response.text, "html.parser")

    issues = []

    # Check images for missing alt attributes
    images = soup.find_all("img")
    images_without_alt = [
        img for img in images
        if not img.get("alt")
    ]

    if images_without_alt:
        issues.append({
            "type": "Images",
            "severity": "High",
            "message": (
                f"{len(images_without_alt)} image(s) "
                "are missing alternative text."
            ),
        })

    # Check page title
    title = soup.find("title")

    if not title or not title.get_text(strip=True):
        issues.append({
            "type": "Page Title",
            "severity": "High",
            "message": "The page does not have a descriptive title.",
        })

    # Check headings
    headings = soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6"])

    if not headings:
        issues.append({
            "type": "Headings",
            "severity": "Medium",
            "message": "No heading elements were found on the page.",
        })

    # Check form inputs
    inputs = soup.find_all("input")

    unlabeled_inputs = []

    for input_element in inputs:
        input_type = input_element.get("type", "").lower()

        if input_type in ["hidden", "submit", "button"]:
            continue

        input_id = input_element.get("id")
        input_name = input_element.get("name")
        aria_label = input_element.get("aria-label")

        has_label = False

        if input_id:
            label = soup.find("label", attrs={"for": input_id})
            if label:
                has_label = True

        if input_name and not has_label:
            label = soup.find("label", attrs={"for": input_name})
            if label:
                has_label = True

        if aria_label:
            has_label = True

        if not has_label:
            unlabeled_inputs.append(input_element)

    if unlabeled_inputs:
        issues.append({
            "type": "Form Labels",
            "severity": "Medium",
            "message": (
                f"{len(unlabeled_inputs)} form input(s) "
                "may not have accessible labels."
            ),
        })

    # Calculate basic score
    total_checks = 4
    failed_checks = len(issues)

    score = max(
        0,
        round(((total_checks - failed_checks) / total_checks) * 100)
    )

    return {
        "url": url,
        "score": score,
        "issues": issues,
        "summary": {
            "images_checked": len(images),
            "headings_found": len(headings),
            "inputs_checked": len(inputs),
            "issues_found": len(issues),
        },
    }


@app.get("/")
def root():
    return {
        "message": "India Post Accessibility Audit API is running."
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/audit")
def audit(request: AuditRequest):
    validate_url(request.url)

    return run_basic_audit(request.url)
