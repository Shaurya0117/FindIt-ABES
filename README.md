# Smart Campus Lost & Found - Team Vynex

This project was built for the WebSpark 2026 hackathon by **Team Vynex**.

## Team Members
- **Shaurya Pratap Singh** (Shaurya.25b15310117@abes.ac.in) - Team Leader
- **Subhan** (Subhan.25b15310060@abes.ac.in)
- **Sumit** (Sumit.25b15310155@abes.ac.in)

## Project Overview
A fully-functional, premium full-stack application designed specifically for the ABESEC campus environment to help students report, search, and claim lost items. 

Features:
- **Beautiful Glassmorphism Design**: Sleek dark mode aesthetics with responsive grids and dynamic hover effects.
- **REST API Backend**: Node.js + Express with a SQLite database (Zero setup required!).
- **Frontend**: Vite + React + React Router.

## How to Run Locally in VS Code

### 1. Start the Backend
Open a new terminal in VS Code and run:
```bash
cd backend
npm install
node server.js
```
*The backend will run on `http://localhost:5000`.*

### 2. Start the Frontend
Open a **second** terminal in VS Code and run:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will run on `http://localhost:5173`.*

## Database
The database uses SQLite via Prisma. It comes pre-migrated with a `dev.db` file in the `backend/prisma/` folder. No MongoDB configuration is needed!
