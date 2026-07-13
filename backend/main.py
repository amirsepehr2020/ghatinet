from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Spix API",
    description="AI Tool Finder Backend",
    version="1.0.0"
)

# ===========================
# CORS
# ===========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # بعداً فقط دامنه خودت رو قرار می‌دیم
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===========================
# Home
# ===========================

@app.get("/")
async def home():

    return {
        "status": "online",
        "name": "Spix API",
        "version": "1.0.0"
    }

# ===========================
# Health Check
# ===========================

@app.get("/health")
async def health():

    return {
        "status": "ok"
    }
