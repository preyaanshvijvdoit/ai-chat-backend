# API Documentation

Base URL
http://localhost:5000/api/v1


---

## Authentication

### Register

**POST**
/auth/register


Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}

Success Response

201 Created

{
  "success": true,
  "message": "User registered successfully.",
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}

Possible Errors

Status	Reason
400	Validation failed
409	Email already registered
409	Please verify your email before registering again

Login

POST

/auth/login

Request Body

{
  "email": "john@example.com",
  "password": "Password@123"
}

Success Response

200 OK

{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {},
    "accessToken": "...",
    "refreshToken": "..."
  }
}

Possible Errors

Status	Reason
400	Validation failed
401	Invalid email or password
403	Please verify your email before logging in
Logout

POST

/auth/logout

Request Body

None

Success Response

{
  "success": true,
  "message": "Logout successful.",
  "data": null
}
Verify Email

POST

/auth/verify-email

Request Body

{
  "token": "verification_token"
}

Success Response

{
  "success": true,
  "message": "Email verified successfully.",
  "data": null
}

Possible Errors

Status	Reason
400	Invalid verification token
400	Verification token has expired
User
Current User

GET

/users/me

Authentication Required

Bearer Token or Authentication Cookie

Success Response

{
  "success": true,
  "message": "User fetched successfully.",
  "data": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "USER"
  }
}

Possible Errors

Status	Reason
401	Authentication required
401	Invalid or expired token