# MHS01 frontend scope

## Phase 1 objective
Deliver a coherent, responsive and navigable interface before implementing persistence or business-critical backend logic.

## Screens
- Overview
- Patients
- Appointments
- Clinical workspace
- ANC / maternal care
- Family planning
- Laboratory
- Pharmacy
- Inventory
- Billing
- Reports
- Staff
- Settings

## Interaction model
The prototype uses React component state for temporary interactions such as opening dialogs, searching, filtering, switching screens and adding a demo patient or stock item. No browser storage is used. A refresh resets demo changes.

## Planned Django integration
Keep API concerns inside `src/services/api.ts`. The future backend should provide authentication, permissions, tenant-aware query filtering, server-side validation, audit trails, and API endpoints. The UI must not be considered a security boundary.
