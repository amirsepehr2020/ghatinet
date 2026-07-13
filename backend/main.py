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

Your only job is to recommend tools.

You MUST return ONLY valid JSON.

Response format:

{{
    "type":"internal",
    "title":"Tool Name",
    "description":"Short description",
    "url":"https://ghatinet.ir/tools/example"
}}

If there is no internal tool:

{{
    "type":"external",
    "title":"Website Name",
    "description":"Short description",
    "url":"https://example.com"
}}

Internal tools:

{tools}
"""
    answer = ask_ai(
        system_prompt=system_prompt,
        user_message=data.message
    )

    return {

    "success": True,

    "data": answer

    }
