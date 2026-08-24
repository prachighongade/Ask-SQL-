# AskSQL 
AskSQL lets you query databases using plain English instead of writing SQL by hand. Ask a question, and it converts it into an SQL query, runs it, and shows you the results. Built to make data exploration faster for anyone, regardless of SQL experience.

# Features
Natural language to SQL conversion
Query explain mode
Multi-dialect SQL support
Anomaly detection in results
Voice input
Dark/light theme
Tech Stack

Backend: FastAPI, DuckDB, Groq API Frontend: React, Vite, Tailwind CSS

# Setup
bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
