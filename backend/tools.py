import json


TOOLS_FILE = "tools.json"


def load_tools():

    try:

        with open(TOOLS_FILE, "r", encoding="utf-8") as file:

            return json.load(file)

    except Exception:

        return []


def find_tools(user_message: str):

    user_message = user_message.lower()

    matched = []

    tools = load_tools()

    for tool in tools:

        for keyword in tool.get("keywords", []):

            if keyword.lower() in user_message:

                matched.append(tool)

                break

    return matched
