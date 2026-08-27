import os

from fastapi import FastAPI, HTTPException
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

# Local dev origin, plus any extra origins from an env var (comma-separated),
# e.g. ALLOWED_ORIGINS=https://ask-sql-xyz.vercel.app,https://asksql.yourdomain.com
extra_origins = os.getenv("ALLOWED_ORIGINS", "")
allow_origins = ["http://localhost:5173"] + [
    origin.strip() for origin in extra_origins.split(",") if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    # Also allow any Vercel preview/production deployment URL for this project
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.templates import get_all_templates, get_templates_by_role

@app.get("/templates")
def list_templates():
    """Return all role-based query templates."""
    return get_all_templates()

@app.get("/templates/{role_key}")
def list_templates_for_role(role_key: str):
    """Return templates for a single role."""
    result = get_templates_by_role(role_key)
    if result is None:
        raise HTTPException(status_code=404, detail=f"Role '{role_key}' not found")
    return result