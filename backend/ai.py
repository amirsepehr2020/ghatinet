from openai import OpenAI

from config import config

import json



client = OpenAI(
    api_key=config.GROQ_API_KEY,
    base_url="https://api.groq.com/openai/v1"
)


def ask_ai(system_prompt: str, user_message: str) -> str:

    response = client.chat.completions.create(

        model=config.MODEL,

        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_message
            }
        ],

        temperature=config.TEMPERATURE,

        max_tokens=config.MAX_TOKENS

    )
    return json.loads(
    response.choices[0].message.content
    )
