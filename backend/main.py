from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas.chat import ChatRequest, ChatResponse

from ai import ask_ai
from tools import find_tools
from prompts import load_prompt


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

    system_prompt = load_prompt(
        "system",
        tools=tools
    )

    answer = ask_ai(
        system_prompt=system_prompt,
        user_message=data.message
    )

    return {
        "success": True,
        "data": answer
    }
