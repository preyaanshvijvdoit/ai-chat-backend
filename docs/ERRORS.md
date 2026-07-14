# Error Reference

## 400 Bad Request

Returned when the request is invalid.

Examples

- Validation failed
- Invalid verification token
- Verification token has expired

---

## 401 Unauthorized

Returned when authentication fails.

Examples

- Invalid email or password
- Missing authentication token
- Invalid token
- Expired token

---

## 403 Forbidden

Returned when authentication succeeds but access is denied.

Examples

- Email not verified

---

## 404 Not Found

Returned when a requested resource does not exist.

Examples

- Route not found
- User not found

---

## 409 Conflict

Returned when the request conflicts with existing data.

Examples

- Email already registered
- Please verify your email before registering again

---

## 500 Internal Server Error

Returned for unexpected server-side failures.