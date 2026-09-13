# 🇮🇳 India Post Accessibility Audit

A full-stack web application that analyzes webpages for common accessibility issues and generates a basic accessibility audit report.

The project is designed as an internship project to demonstrate practical skills in **React, FastAPI, web scraping, accessibility analysis, API integration, and cloud deployment**.

---

## 🚀 Live Demo

### Frontend
https://india-post-accessibility-audit-47af.vercel.app/

### Backend API
https://india-post-accessibility-audit.onrender.com

### API Documentation
https://india-post-accessibility-audit.onrender.com/docs

---

## 📌 Project Overview

Web accessibility is important for ensuring that websites can be used by people with different abilities and assistive technologies.

The **India Post Accessibility Audit** application allows a user to enter a webpage URL and automatically performs a set of basic accessibility checks.

The system fetches the webpage, analyzes its HTML structure, identifies potential accessibility problems, calculates a basic accessibility score, and displays the results through a simple dashboard.

---

## 🎯 Objectives

The main objectives of this project are:

- Analyze webpages for common accessibility issues.
- Identify images without alternative text.
- Check whether the webpage contains a meaningful title.
- Analyze heading structure.
- Identify form inputs that may not have accessible labels.
- Generate a simple accessibility score.
- Provide results through an easy-to-use web interface.
- Demonstrate a complete frontend-to-backend deployment workflow.

---

## ✨ Features

### Accessibility Audit

The application currently performs the following checks:

- 🖼️ Missing image `alt` text
- 📄 Missing or empty page title
- 📝 Heading availability
- 🏷️ Accessible form labels

### Dashboard

The frontend displays:

- Accessibility Score
- Number of Issues Found
- Images Checked
- Headings Found
- Detailed accessibility findings
- Issue severity

### API

The backend provides REST API endpoints for:

- Health checking
- Accessibility auditing
- Interactive Swagger API documentation

---

## 🏗️ System Architecture

```text
                 ┌─────────────────────┐
                 │      User           │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ React + Vite        │
                 │ Frontend            │
                 │ Vercel              │
                 └──────────┬──────────┘
                            │
                            │ POST /audit
                            ▼
                 ┌─────────────────────┐
                 │ FastAPI Backend     │
                 │ Render              │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Website Fetching    │
                 │ requests            │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ HTML Analysis       │
                 │ BeautifulSoup       │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Audit Results       │
                 │ Score + Issues      │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ React Dashboard     │
                 └─────────────────────┘
🛠️ Technology Stack
Frontend
React
Vite
JavaScript
CSS
Fetch API
Backend
Python
FastAPI
Uvicorn
Requests
BeautifulSoup
Deployment
GitHub
Vercel
Render
📂 Project Structure
india-post-accessibility-audit/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── style.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── main.py
│   ├── requirements.txt
│   └── render.yaml
│
├── docs/
│
└── README.md
🔄 How It Works
User enters a webpage URL.
React frontend sends the URL to the FastAPI backend.
FastAPI validates the URL.
The backend fetches the webpage using requests.
BeautifulSoup parses the HTML.
The audit engine checks accessibility-related elements.
Detected issues are classified by severity.
A basic accessibility score is calculated.
The API returns the audit results.
React displays the results on the dashboard.
🔌 API Endpoints
Health Check
GET /health
Example response:
{
  "status": "healthy"
}
Accessibility Audit
POST /audit
Request:
{
  "url": "https://example.com"
}
Example response:
{
  "url": "https://example.com",
  "score": 100,
  "issues": [],
  "summary": {
    "images_checked": 0,
    "headings_found": 1,
    "inputs_checked": 0,
    "issues_found": 0
  }
}
🧪 Testing
The application was tested using both a simple webpage and the real India Post website.
Example.com
Metric
Result
Accessibility Score
100%
Issues Found
0
Images Checked
0
Headings Found
1
India Post
Tested URL:
https://www.indiapost.gov.in
Metric
Result
Accessibility Score
50%
Issues Found
2
Images Checked
77
Headings Found
15
Detected Issues
Images
25 images were detected without alternative text.
Severity: High
Form Labels
3 form inputs may not have accessible labels.
Severity: Medium
📊 Current Audit Logic
The current version performs four major categories of checks:
1. Images
2. Page Title
3. Headings
4. Form Labels
The current score is a basic project-specific score, intended to summarize these checks.
It should not be interpreted as an official WCAG compliance score.
💻 Local Setup
Clone Repository
git clone https://github.com/santoshlm-lab/india-post-accessibility-audit.git
Frontend Setup
cd india-post-accessibility-audit/client
npm install
npm run dev
The frontend will run locally using Vite.
Backend Setup
Open another terminal:
cd india-post-accessibility-audit/server
Install dependencies:
pip install -r requirements.txt
Start the API:
uvicorn main:app --reload
The API will be available locally at:
http://localhost:8000
Swagger documentation:
http://localhost:8000/docs
☁️ Deployment
Backend
The FastAPI backend is deployed on Render.
Production API:
https://india-post-accessibility-audit.onrender.com
Frontend
The React frontend is deployed on Vercel.
The frontend communicates with the deployed FastAPI backend through the /audit API endpoint.
🔐 Security & Limitations
This is an internship/demo project and currently performs a limited set of HTML-based accessibility checks.
It does not replace professional accessibility testing or a complete WCAG audit.
Potential future improvements include:
WCAG 2.1/2.2 rule coverage
Better heading hierarchy analysis
Link accessibility checks
Button accessibility checks
Color contrast analysis
Keyboard accessibility analysis
ARIA validation
Landmark analysis
Detailed recommendations
PDF/CSV audit reports
Historical audit tracking
More advanced accessibility scoring
🔮 Future Enhancements
The project can be extended into a more complete accessibility auditing platform with:
Automated WCAG rule engine
AI-powered accessibility recommendations
Accessibility report generation
Website history and comparison
Dashboard analytics
Batch URL auditing
Scheduled accessibility monitoring
Accessibility issue prioritization
Detailed developer remediation suggestions
📚 Learning Outcomes
Through this project, the following practical concepts were implemented:
React frontend development
Vite project setup
REST API integration
FastAPI backend development
HTML parsing with BeautifulSoup
Webpage analysis
Accessibility auditing concepts
JSON API responses
CORS configuration
Git and GitHub workflow
Vercel deployment
Render deployment
Frontend-backend integration
Real-world website testing
👨‍💻 Project
India Post Accessibility Audit
Built as an internship project demonstrating practical full-stack development and web accessibility analysis.
⭐ Conclusion
The India Post Accessibility Audit demonstrates how a full-stack application can automate basic accessibility checks on webpages.
The project successfully connects a React frontend with a FastAPI backend and performs real-world analysis on webpages, including the India Post website.
The current implementation provides a foundation for building a more comprehensive automated accessibility testing platform.
