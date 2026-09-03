# AskSQL

A full-stack natural language to SQL tool: ask a question in plain English, get back a generated SQL query, an explanation, and results  with anomaly detection, voice input, and multi-dialect support built in.

Live: [ask-sql-rose.vercel.app](https://ask-sql-rose.vercel.app)
Author: Prachi Ghongade · [GitHub](https://github.com/prachighongade/Ask-SQL-)

## Features

- Natural language → SQL generation, powered by Groq's LLM API
- Ambiguity and confidence detection on generated queries
- Query "explain" mode that breaks down what the SQL does
- Multi-dialect SQL support
- Role-based query templates
- IQR-based anomaly detection on result sets
- Feedback loop for improving query quality
- Voice input via the Web Speech API
- Dark/light theme with a black-and-white accent palette

## Stack

- Frontend: React 19, Vite, Tailwind CSS v4, Axios
- Backend: FastAPI, DuckDB
- LLM layer: Groq API
- Hosting: Backend on Render, frontend on Vercel

## Run locally

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Local API docs (dev only): http://localhost:8000/docs

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. By default the app talks to http://localhost:8000.


## Do not share / do not commit

Keep these out of the README, git, screenshots, issues, and chat logs:

- Groq API key — bypass of app controls / billing abuse on your account
- Render / Vercel deploy tokens or dashboard credentials — account takeover / deploy abuse
- Production .env files — bundle of the above
- Any database connection strings — full access to stored data


## License

Personal project by Prachi Ghongade.

