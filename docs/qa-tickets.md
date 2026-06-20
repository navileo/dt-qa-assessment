# QA Tickets — HRMS Construction Payroll

---

## TICKET-001: Login accepts wrong password
**Type:** Critical Bug  
**Severity:** Critical  
**Affects:** All users  

**Description:**
The login form accepts incorrect passwords and grants access to the dashboard.
A user can enter any password and still log in successfully.

**Steps to Reproduce:**
1. Go to http://localhost:5173
2. Enter username: aldi
3. Enter any wrong password
4. Click Login
5. You are redirected to dashboard

**Expected:** Login fails, error message shown  
**Actual:** Login succeeds with wrong password  
**Who gets hurt:** Any unauthorized person can access payroll data  

---

## TICKET-002: Login accepts empty fields
**Type:** Critical Bug  
**Severity:** Critical  
**Affects:** All users  

**Description:**
The login form allows submission with empty username and password fields.
No validation exists on the frontend or backend.

**Steps to Reproduce:**
1. Go to http://localhost:5173
2. Leave both fields empty
3. Click Login
4. You are redirected to dashboard

**Expected:** Validation error shown, login blocked  
**Actual:** User is logged in without any credentials  
**Who gets hurt:** Anyone can access the system without credentials  

---

## TICKET-003: Dashboard accessible without login
**Type:** Critical Bug  
**Severity:** Critical  
**Affects:** Payroll data, employee records  

**Description:**
Unauthenticated users can directly navigate to /admin/dashboard
and access all payroll and employee data without logging in.

**Steps to Reproduce:**
1. Open a fresh browser (not logged in)
2. Go to http://localhost:5173/admin/dashboard
3. Dashboard loads with full data

**Expected:** Redirect to login page  
**Actual:** Full dashboard accessible without authentication  
**Who gets hurt:** Worker payroll data exposed to anyone with the URL  

---

## TICKET-004: No environment variable validation on startup
**Type:** Process Gap  
**Severity:** High  
**Affects:** Production deployments  

**Description:**
The app starts without validating required environment variables.
If APP_PORT or DB credentials are missing from .env, the app crashes
mid-deployment instead of failing fast with a clear error.
This caused 4 hours of downtime in the real incident where 200 payslips failed.

**Steps to Reproduce:**
1. Remove APP_PORT from .env
2. Start the backend
3. App crashes with unclear error

**Expected:** App checks env vars at startup and exits with clear message  
**Actual:** App crashes mid-run with cryptic Node.js error  
**Who gets hurt:** Payroll operator — month-end payslip generation fails  

---

## TICKET-005: No test coverage on salary calculation
**Type:** Test Gap  
**Severity:** High  
**Affects:** All workers salaries  

**Description:**
The salary/payslip generation module has zero automated test coverage.
A decimal error in overtime rate calculation caused a real financial loss.
Any change to the salary module can silently break calculations
and affect hundreds of workers pay.

**Steps to Reproduce:**
1. Open Backend/controllers
2. Check salary calculation logic
3. No tests exist for this module

**Expected:** Unit tests covering salary calculation with known inputs/outputs  
**Actual:** No tests — any change can silently break worker salaries  
**Who gets hurt:** Construction workers — wrong salary, missed meals