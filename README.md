# 🚀 Scalable REST API with Authentication & Role-Based Access

This project is a full-stack application built as part of a Backend Developer Internship assignment. It demonstrates a scalable REST API with secure authentication, role-based access control, and a basic frontend UI for interaction.

---

## 📌 Features

### 🔐 Authentication
- User Registration & Login
- Password hashing using bcrypt
- JWT-based authentication

### 👥 Role-Based Access Control
- Users have roles: `user` or `admin`
- Admin-only access for specific actions (e.g., deleting tasks)
- Unauthorized users receive proper error responses

### 📦 CRUD Operations
- Create, Read, Update, Delete tasks
- Each task is linked to a specific user

### ⚙️ API Design
- RESTful API structure
- API versioning (`/api/v1`)
- Proper HTTP status codes

### 🛡️ Security
- JWT token validation
- Protected routes
- Input validation using express-validator
- Helmet security headers
- Auth rate limiting for abuse protection

### 📄 API Documentation
- Swagger UI available at:
http://localhost:5000/api-docs

### ⚡ Performance & Demo Readiness
- Gzip compression enabled for API responses
- MongoDB connection pool tuning via environment variables
- Indexed task queries and optimized `.lean()` read paths
- Task list pagination, sorting, and search API support
- Lightweight in-memory task list cache with smart invalidation
- Graceful shutdown handlers for clean demo restarts
- Frontend code-splitting and centralized API client with request timeout

### 🧰 Skills Showcase
The frontend now includes a visible skills matrix you can use in a company demo. It highlights:
- ReactJS
- RestAPIs
- Error Handling & Debugging
- Performance Optimization
- AI Prompting
- Claude Code
- Cursor

It also labels adjacent technologies you can discuss honestly as part of the architecture story:
- NextJS
- Tailwind CSS
- Typescript
- PostgreSQL
- Supabase
- Vercel

### 🚀 Modernization Path
This repo can be upgraded in stages to a modern Next.js stack without losing the current backend demo.

Recommended order:
1. Move the frontend from Vite to Next.js.
2. Convert the frontend to TypeScript.
3. Replace custom CSS with Tailwind CSS.
4. Host the frontend on Vercel.
5. Optionally move auth and data persistence to Supabase later.

Current compatibility notes:
- Vercel works well for the frontend as-is, and even better after a Next.js migration.
- Supabase is a good option if you want to replace MongoDB/Postgres-backed auth/data later.
- Tailwind and TypeScript are both straightforward once the frontend is converted to Next.js.

---

## 🧱 Tech Stack

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcrypt
- express-validator

### Frontend:
- React.js (Vite)
- Fetch API
- Skills showcase UI for demo presentation
- Ready for a staged Next.js / TypeScript / Tailwind migration

---

## 📂 Project Structure

src/
│── config/
│── controllers/
│── middleware/
│── models/
│── routes/
│── app.js
server.js

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

git clone <your-repo-link>
cd scalable_api

---

### 2️⃣ Install dependencies

npm install

---

### 3️⃣ Create `.env` file

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
MONGO_MAX_POOL_SIZE=20
MONGO_MIN_POOL_SIZE=5

---

### 4️⃣ Run Backend

npm run dev

---

### 5️⃣ Run Frontend

cd frontend
npm install
npm run dev

---

## 🔑 API Endpoints

### Auth
- POST /api/v1/auth/register
- POST /api/v1/auth/login

### Tasks
- GET /api/v1/tasks
- POST /api/v1/tasks
- PUT /api/v1/tasks/:id
- DELETE /api/v1/tasks/:id (Admin only)

`GET /api/v1/tasks` query params:
- `page` (default `1`)
- `limit` (default `20`, max `100`)
- `search` (title contains)
- `sortBy` (`createdAt`, `updatedAt`, `title`)
- `order` (`asc`, `desc`)

---

## 🔐 Role-Based Access Example

### ❌ Normal User
DELETE /tasks/:id  
→ "Admin access only"

### ✅ Admin User
DELETE /tasks/:id  
→ "Task deleted"

---

## 🎨 Frontend Features

- User Registration & Login
- Token-based authentication
- Dashboard for managing tasks
- Create & delete tasks
- Displays success/error messages
- Skills matrix landing section for demo narration

---

## 📈 Scalability Considerations

This project follows a modular and scalable architecture with practical production optimizations already implemented.

Next improvements:
- Microservices architecture
- Redis caching for performance
- Load balancing for high traffic
- Docker containerization
- Centralized logging

---

## ✅ Evaluation Criteria Covered

- ✔ RESTful API design
- ✔ Database schema design
- ✔ Secure authentication (JWT + hashing)
- ✔ Role-based authorization
- ✔ Functional frontend integration
- ✔ Scalable backend structure

---

## 📌 Conclusion

This project demonstrates the ability to build a secure, scalable backend system with a functional frontend, following best practices in API design, authentication, and modular architecture.

---

## 👨‍💻 Author

Deepanjan Saha
