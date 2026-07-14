
---

# docs/AUTH_FLOW.md

```md
# Authentication Flow

## Registration

User submits registration form

↓

Backend validates request

↓

User account created

↓

Verification token generated

↓

Verification email sent

↓

Frontend displays:

"Registration successful. Please verify your email."

---

## Email Verification

User clicks verification link

↓

Frontend extracts token

↓

Frontend calls

POST /auth/verify-email

↓

Backend verifies token

↓

User account marked as verified

↓

Frontend redirects user to Login page

---

## Login

User submits email and password

↓

Backend validates credentials

↓

Email verified?

No

↓

Return

403 Forbidden

"Please verify your email before logging in."

Yes

↓

Generate Access Token

↓

Generate Refresh Token

↓

Store Refresh Token

↓

Return authenticated user

---

## Logout

Frontend calls

POST /auth/logout

↓

Authentication cookie removed

↓

User session ends

---

## Protected Route

Frontend requests protected resource

↓

Authentication Middleware

↓

JWT Validation

↓

User attached to request

↓

Controller executes