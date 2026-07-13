import json


TOOLS_FILE = "tools.json"


def load_tools():

    try:

        with open(TOOLS_FILE, "r", encoding="utf-8") as file:

            return json.load(file)

    except FileNotFoundError:

        return []

    except Exception as error:

        print(error)

        return []
