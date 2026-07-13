from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas.chat import ChatRequest, ChatResponse

from ai import ask_ai
from tools import load_tools
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

for tool in tools:

    tool["url"] = config.BASE_URL + tool["path"]

class ChatRequest(BaseModel):
    message: str

def load_system_prompt():

    with open(
        "prompts/system.txt",
        "r",
        encoding="utf-8"
    ) as file:

        return file.read()
        
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

    tools = find_tools(data.message)

    system_prompt = load_system_prompt().replace(
    "{tools}",
    str(tools)
    )
    
    answer = ask_ai(
        system_prompt=system_prompt,
        user_message=data.message
    )

    return {

    "success": True,

    "data": answer

    }

@app.post("/chat", response_model=ChatResponse)
