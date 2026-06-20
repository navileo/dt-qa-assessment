# Test Strategy — HRMS Construction Payroll QA

## Why This Test Suite Exists

This HRMS serves construction companies where payroll errors directly 
affect blue-collar workers earning ₹15,000–₹25,000/month. A wrong 
salary calculation means a worker doesnt get what they earned.
A wrong payslip isnt a UI bug — its broken trust and a missed meal.

## The People This Suite Protects

| Person | Risk | What breaks for them |
|---|---|---|
| Construction Worker | Highest | Wrong salary, missed meal |
| Payroll Operator | High | Month-end failure, manual work |
| Site Manager | Medium | Attendance not submitted |
| HR Team | Medium | Wrong records break payroll |
| Developer | Low | No safety net when changing code |

## The Data Pipeline

Onboarding → Attendance → Overtime → Deductions → Payslip → Payout

Every test traces back to: does this protect the workers payslip?

## What We Test and Why

### E2E Tests (Playwright) — 6 tests
- Login flow — gate to entire system
- Bug: wrong password accepted — security gap
- Bug: empty fields accepted — no validation
- Employee list access — HR core function
- Attendance page access — SM core function
- Bug: dashboard without login — no auth guard

### API Tests (Playwright request) — 4 tests
- Attendance route exists — catches route rename incident
- Attendance route requires auth — data protection
- Employee route exists — core data pipeline
- Employee route requires auth — data protection

## Bugs Discovered

| Bug | Severity | Impact |
|---|---|---|
| Login accepts wrong password | Critical | Anyone can access payroll data |
| Login accepts empty fields | Critical | No authentication required |
| Dashboard accessible without login | Critical | Payroll data exposed publicly |
| No env var validation | High | Production crashes like real incident |
| No salary calculation tests | High | Silent payroll errors |

## What We Chose NOT to Automate

- UI styling and layout tests — low business value
- PDF payslip visual tests — brittle, hard to maintain
- Performance/load tests — out of scope for this phase

## Tradeoffs

10 focused tests protect specific people from specific failures.
This is worth more than 100 shallow tests checking the same thing.

## CI Pipeline

GitHub Actions runs on every push to main.
Validates test structure and Playwright installation.
Full E2E tests run locally against live database.