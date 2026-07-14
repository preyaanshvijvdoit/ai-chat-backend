# AI Chat Backend

A production-ready backend for an AI-powered chat application.

The project provides secure authentication, email verification, protected APIs, and serves as the backend for an AI chat platform.

---

# Features

## Authentication

- User Registration
- User Login
- User Logout
- Email Verification
- JWT Authentication
- HTTP-only Cookies
- Protected Routes

## Security

- Password Hashing
- Input Validation
- Global Error Handling
- Structured Logging

## Database

- PostgreSQL
- Prisma ORM
- UUID Primary Keys
- Soft Delete Support

---

# Tech Stack

Backend

- Node.js
- Express.js
- TypeScript

Database

- PostgreSQL
- Prisma ORM

Authentication

- JWT
- bcrypt

Email

- Resend

Validation

- Zod

Logging

- Pino

---

# Project Structure

```text
src/
│
├── config/
├── constants/
├── controllers/
├── generated/
├── interfaces/
├── lib/
├── middlewares/
├── repositories/
├── routes/
├── services/
├── types/
├── utils/
└── validators/

prisma/

docs/
```

---

# Installation

```bash
git clone <repository-url>

cd ai-chat-backend

npm install
```

---

# Environment Variables

Copy

```
.env.example
```

to

```
.env
```

Fill in all required values before running the application.

---

# Run Development Server

```
npm run dev
```

---

# API Base URL

```
http://localhost:5000/api/v1
```

---

# Authentication Endpoints

```
POST /auth/register

POST /auth/login

POST /auth/logout

POST /auth/verify-email

GET /users/me
```

---

# Current Status

Completed

- Authentication
- Email Verification
- Protected Routes
- Validation
- Logging
- Error Handling

In Progress

- Refresh Token Rotation
- Forgot Password
- Reset Password

Upcoming

- Chat Management
- AI Integration
- Conversation History
- RAG
- Admin Features

---

# Roadmap

- Refresh Tokens
- Password Reset
- Chat APIs
- AI APIs
- File Uploads
- Rate Limiting
- Docker
- CI/CD
- Production Deployment

---

# License

This project is intended for educational and portfolio purposes.