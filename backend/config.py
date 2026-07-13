import os

from dotenv import load_dotenv


load_dotenv()


class Config:

    GROQ_API_KEY = os.getenv("GROQ_API_KEY")

    MODEL = "openai/gpt-oss-120b"

    TEMPERATURE = 0.3

    MAX_TOKENS = 1024


config = Config()
BASE_URL = "https://ghatinet.ir"
