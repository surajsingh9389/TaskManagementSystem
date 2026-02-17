## Overview

This project is a scalable REST API with authentication and role-based access control, built using Node.js, Express, and MongoDB.

The system allows users to register, log in securely using JWT authentication, and manage tasks based on their role (User or Admin).

A basic React frontend is included to demonstrate API interaction and protected route access.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- bcrypt (Password hashing)
- express-validator (Input validation)
- Centralized Error Handling Middleware
- Postman (API documentation)

### Frontend
- React (Vite)
- Axios
- React Router DOM

---

## Features Implemented

### Authentication
- User Registration with hashed password
- Secure Login with JWT generation
- Token-based authentication middleware
- JWT auto-attachment in frontend requests

### Role-Based Access Control
- User role → Can manage only their own tasks
- Admin role → Can view, update, and delete all tasks

### CRUD Operations (Tasks)
- Create Task
- Get Tasks (User: own tasks, Admin: all tasks)
- Update Task
- Delete Task

### Backend Best Practices
- API Versioning (`/api/v1`)
- Centralized error handling
- Input validation middleware
- Modular folder structure
- Secure JWT handling
- Environment variable configuration

### API Documentation
- Postman collection included in `/docs`
- Environment variables supported
- JWT auto-save in Postman

### Frontend Integration
- Register & Login UI
- Protected Dashboard
- Task CRUD UI
- Success/Error message handling

---

## Project Structure

# PrimeTrade Backend Developer Assignment

## Overview

This project is a scalable REST API with authentication and role-based access control, built using Node.js, Express, and MongoDB.

The system allows users to register, log in securely using JWT authentication, and manage tasks based on their role (User or Admin).

A basic React frontend is included to demonstrate API interaction and protected route access.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- bcrypt (Password hashing)
- express-validator (Input validation)
- Centralized Error Handling Middleware
- Postman (API documentation)

### Frontend
- React (Vite)
- Axios
- React Router DOM

---

## Features Implemented

### Authentication
- User Registration with hashed password
- Secure Login with JWT generation
- Token-based authentication middleware
- JWT auto-attachment in frontend requests

### Role-Based Access Control
- User role → Can manage only their own tasks
- Admin role → Can view, update, and delete all tasks

### CRUD Operations (Tasks)
- Create Task
- Get Tasks (User: own tasks, Admin: all tasks)
- Update Task
- Delete Task

### Backend Best Practices
- API Versioning (`/api/v1`)
- Centralized error handling
- Input validation middleware
- Modular folder structure
- Secure JWT handling
- Environment variable configuration

### API Documentation
- Postman collection included in `/docs`
- Environment variables supported
- JWT auto-save in Postman

### Frontend Integration
- Register & Login UI
- Protected Dashboard
- Task CRUD UI
- Success/Error message handling

---

## Project Structure

```text
root/
├── backend/
│   ├── controllers/      # Route controllers (logic)
│   ├── middleware/       # Custom auth & error middlewares
│   ├── models/           # Mongoose schemas (User, Task, etc.)
│   ├── routes/           # API route definitions
│   ├── utils/            # Helper functions
│   ├── validators/       # Request validation logic
│   ├── docs/             # API Documentation
│   │   └── PrimeTrade_Backend_Assignment.postman_collection.json
│   └── app.js            # Entry point (Express config)
│
└── frontend/
    ├── pages/            # View components (Login, Dashboard)
    ├── services/         # API call abstractions (Axios/Fetch)
    └── App.jsx           # Main React component

## Installation & Setup

###  Clone Repository

- git clone <your-repository-link>
- cd Backend
- npm install
- Create a .env file in root:
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
- npm run dev 

- cd frontend
- npm install
- npm run dev

---

## API Endpoints (v1)

### Authentication
- POST   /api/v1/auth/register
- POST   /api/v1/auth/login

### User Tasks
- POST   /api/v1/user
- GET    /api/v1/user
- PUT    /api/v1/user/:id
- DELETE /api/v1/user/:id

### Admin Tasks
- GET    /api/v1/admin/tasks
- PUT    /api/v1/admin/tasks/:id
- DELETE /api/v1/admin/tasks/:id

---

## API Documentation
- Postman collection included in `/docs`
- Environment variables supported
- JWT auto-save in Postman

---

## Scalability & Architecture Note

The application follows a modular architecture separating routes, controllers, middleware, and services for better maintainability and future scalability.

To scale further:
- Deploy behind a load balancer to distribute traffic across multiple servers
- Implement Redis caching for frequently accessed data
- Enable horizontal scaling using Docker and Kubernetes
- Move authentication into a dedicated microservice
- Add database indexing to optimize query performance

These improvements help the system handle higher traffic, improve performance, and remain reliable as the application grows.
