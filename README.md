Grocify Backend

## Project Overview

This is the backend for **Grocify**, a modern grocery product management system.  
It is built using **Node.js**, **Express.js**, and **Firebase Firestore & Storage**.

The backend provides APIs for authentication, real-time product management, image uploads, and analytics data.

---

## Features

### Authentication

- Secure login with JWT tokens.
- JWT stored in HTTP-only cookies.
- Demo admin credentials supported.
- Middleware for protected routes.

### Product Management

- CRUD operations on products:
  - Create (add new products)
  - Read (fetch products in real-time)
  - Update (edit existing products)
  - Delete (remove products)
- Change product status (Active / Disabled).
- Image upload directly to Firebase Storage.
- Server-side validation for required fields.

### Analytics

- Total product count.
- Active vs Inactive products.
- Products grouped by category.
- Real-time updates using Firestore snapshot listeners.

### Security & Validation

- Input validation using middleware.
- Secure Firebase API access via server-side environment variables.
- CORS enabled for frontend communication.

---

## Demo Credentials

Email: admin@demo.com
Password: 123456

yaml
Copy code

---

## Project Structure

backend/
├─ controllers/ # Request handlers
│ ├─ auth.Controller.js
├─ routes/ # Express routes
│ ├─ auth.Routes.js
├─ middleware/ # Middleware for auth & validation
│ ├─ authMiddleware.js
├─ utils/ # Helper functions
│ └─ firebase.js # Firebase initialization
├─ .env # Environment variables
├─ package.json
└─ server.js # Entry point

yaml
Copy code

---

## Installation

Clone the repo:

```bash
git clone https://github.com/souravMitra02/grocify-server
cd backend
Install dependencies:

bash
Copy code
npm install
# or
yarn
Set up Firebase environment variables in .env:

env
Copy code
FIREBASE_API_KEY=yourKey
FIREBASE_AUTH_DOMAIN=yourDomain
FIREBASE_PROJECT_ID=yourProjectId
FIREBASE_STORAGE_BUCKET=yourStorageBucket
FIREBASE_MESSAGING_ID=yourSenderId
FIREBASE_APP_ID=yourAppId
JWT_SECRET=yourJWTSecret
Running the Project
bash
Copy code
npm run dev
# or
yarn dev
Server will run on https://grocify-server-zeta.vercel.app/ (default).

API Endpoints
Authentication
POST /api/auth/login – Login with email & password.

POST /api/auth/logout – Clear JWT cookie.

Products
GET /api/products – Get all products (real-time support).

POST /api/products – Add a new product.

PUT /api/products/:id – Update product by ID.

DELETE /api/products/:id – Delete product by ID.

PATCH /api/products/:id/status – Toggle Active/Disabled status.

Notes
Image files must be uploaded via frontend form → backend handles upload to Firebase Storage.

Only .jpg / .png files recommended, max 2–3MB.

Dependencies
express – Node.js web framework

cors – Enable CORS for frontend

firebase-admin – Firebase Admin SDK

firebase – Firestore client

dotenv – Environment variable support

jsonwebtoken – JWT auth


```
