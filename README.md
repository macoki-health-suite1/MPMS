# MaCoKi Health Suite (MHS01) — Frontend

A frontend-first clinic operations interface built with **React, TypeScript and Vite**. The planned backend is Django, developed separately.

## Included in this frontend

- Overview dashboard and operational indicators
- Patient directory, patient registration and patient profile preview
- Appointments and visit queue
- Clinical workspace with consultation, observations, diagnoses and care-plan sections
- ANC / maternal care workspace
- Family planning and reproductive health workspace
- Laboratory requests and results workspace
- Pharmacy and prescriptions workspace
- Inventory catalogue, stock movement, reorder indicators and stock adjustment form
- Billing and payments workspace
- Reports and analytics workspace
- Staff directory and settings
- Responsive sidebar, search, filters, notification panel, modal forms and toast feedback

## Run locally

Requirements: Node.js 20 or newer recommended.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

To verify a production build:

```bash
npm run build
npm run preview
```

## Important data and backend boundary

**This project does not use `localStorage` or `sessionStorage`.** Sample records are in-memory demonstration data. UI-created changes disappear when the page is refreshed. This is intentional for Phase 1: visual completeness and navigation before the Django API is implemented.

API integration scaffolding is in `src/services/api.ts`. It reads `VITE_API_BASE_URL` and provides a small typed request helper for the future Django REST API. It is not yet connected to live endpoints. Do not treat sample data or frontend validation as production clinical records.

## Upload to your existing GitHub repository

1. Download and extract this ZIP.
2. Upload the **contents** of the `MHS01-frontend` folder to the root of your existing repository (not the enclosing ZIP or an extra nested folder).
3. Commit and push the files.
4. In GitHub Codespaces, open the repository terminal and run `npm install`, then `npm run dev`.

If your repository already contains important files, review the extracted files before replacing any same-named files.

## Suggested next phase

Create a separate Django backend with authentication and role-based permissions, organisation/clinic tenancy, database models and migrations, audit logs, validation, API endpoints, tests, and secure handling of patient data. Then replace demo in-memory state with API calls. Clinical workflows require review by qualified local clinical and compliance stakeholders before production use.
