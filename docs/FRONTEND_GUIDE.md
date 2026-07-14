# Frontend Integration Guide

## Register Page

Fields

- Name
- Email
- Password

Submit

POST /auth/register

Success

Display

Registration successful.

Please verify your email before logging in.

Navigate to Login page.

---

## Login Page

Fields

- Email
- Password

Submit

POST /auth/login

Possible Responses

200

Navigate to Dashboard.

403

Display

Please verify your email before logging in.

Provide a "Resend Verification Email" option when available.

401

Display

Invalid email or password.

---

## Verify Email Page

Read token from URL

↓

POST /auth/verify-email

Success

Display

Email verified successfully.

Redirect user to Login.

Failure

Display backend error message.

---

## Dashboard

On page load

↓

GET /users/me

Success

Display user information.

401

Redirect to Login.

---

## Logout

POST /auth/logout

↓

Redirect to Login