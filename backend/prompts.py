from pathlib import Path


PROMPTS_DIR = Path(__file__).parent / "prompts"


def load_prompt(name: str, **kwargs):

    file = PROMPTS_DIR / f"{name}.txt"

    text = file.read_text(
        encoding="utf-8"
    )

    return text.format(**kwargs)
