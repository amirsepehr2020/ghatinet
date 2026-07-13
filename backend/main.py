from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ai import ask_ai
from tools import load_tools


app = FastAPI(
    title="Spix API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


@app.get("/")
async def home():

    return {
        "status": "online",
        "name": "Spix API"
    }


@app.get("/health")
async def health():

    return {
        "status": "ok"
    }


@app.post("/chat")
async def chat(data: ChatRequest):

    tools = load_tools()

    system_prompt = f"""
You are Spix AI.

Your job is NOT to solve the user's task.

Recommend the BEST online tool.

Rules:

1. First check internal tools.

2. If an internal tool exists,
always recommend its URL.

3. If no internal tool exists,
recommend the best trusted website.

Internal tools:

{tools}
"""

    answer = ask_ai(
        system_prompt=system_prompt,
        user_message=data.message
    )

    return {
        "success": True,
        "answer": answer
    }
