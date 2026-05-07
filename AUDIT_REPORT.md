# Project Audit Report: MERN Movie Booking Application

## Summary
The project was audited for security, code quality, and structural integrity. Several critical and high-priority issues were identified, primarily related to data leakage, authentication handling, and deprecated library usage. All identified issues have been addressed.

## Findings & Fixes

### 1. Security: Sensitive Data Leakage
- **Issue:** The API endpoints for retrieving users and admins were returning hashed passwords in the response.
- **Severity:** High
- **Location:** `controllers/user-controller.js`, `controllers/admin-controller.js`
- **Fix:** Applied `.select("-password")` to Mongoose queries to exclude password fields from the response.

### 2. Security: Manual Authentication Parsing
- **Issue:** Authentication (JWT) was being verified manually inside individual controller functions (e.g., `addMovie`), leading to code duplication and potential inconsistencies.
- **Severity:** High
- **Location:** `controllers/movie-controller.js`
- **Fix:** Created a centralized `authMiddleware` in `utils/auth.js` and applied it to the relevant routes in `routes/movie-routes.js`.

### 3. Quality: Deprecated Mongoose Options
- **Issue:** The database connection was using `useNewUrlParser` and `useUnifiedTopology`, which are deprecated in Mongoose 8.x.
- **Severity:** Medium
- **Location:** `utils/dbConnect.js`
- **Fix:** Removed the deprecated options from the `mongoose.connect` call.

### 4. Quality: Inconsistent Error Handling
- **Issue:** Many controller functions used `console.log(err)` instead of `next(err)`, which could cause the client to hang if an error occurred during an async operation.
- **Severity:** Medium
- **Location:** Multiple files in `controllers/`
- **Fix:** Updated controllers to use `next(err)` for proper error propagation.

### 5. Structure: Typo in Model Relationship
- **Issue:** The `User` model had a reference to `"bookings"` instead of the correct model name `"Booking"`.
- **Severity:** Low
- **Location:** `models/User.js`
- **Fix:** Corrected the reference to `ref: "Booking"`.

### 6. Configuration: Missing Environment Variables
- **Issue:** `SECRET_KEY` was being used in the code but was missing from `.env.example`.
- **Severity:** Medium
- **Location:** `.env.example`
- **Fix:** Added `SECRET_KEY` to the example environment file.

### 7. UX/Security: Unprotected Frontend Routes
- **Issue:** Routes like `/add` (add movie) were accessible via URL even if the user was not logged in as an admin.
- **Severity:** Medium
- **Location:** `src/App.js`
- **Fix:** Implemented conditional route rendering based on Redux login state to protect sensitive pages.

## Status: Production Ready
All critical security issues have been resolved. The application structure is now more robust and follows best practices for a MERN stack.

> [!TIP]
> Consider implementing a global error handling middleware in `app.js` to catch all errors passed to `next(err)` and return a consistent JSON response.
