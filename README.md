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

### 📄 API Documentation
- Swagger UI available at:
http://localhost:5000/api-docs

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

---

## 📈 Scalability Considerations

This project follows a modular and scalable architecture.

Future improvements:
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
