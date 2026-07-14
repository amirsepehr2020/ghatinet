from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas.chat import ChatRequest, ChatResponse

from ai import ask_ai
from tools import find_tools


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


@app.post("/chat", response_model=ChatResponse)
async def chat(data: ChatRequest):

    tools = find_tools(data.message)

    system_prompt = f"""
You are Spix AI.

Your job is to recommend the best online tools.

Rules:

- First check the internal tools list.
- If a matching internal tool exists, ALWAYS recommend it.
- If no internal tool exists, recommend the best trusted website.
- Never invent URLs.
- Return ONLY valid JSON.

Response format:

{{
    "type":"internal",
    "title":"Tool Name",
    "description":"Short description",
    "url":"https://ghatinet.ir/tools/example"
}}

or

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
