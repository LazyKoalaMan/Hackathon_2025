# backend/gemnai_client.py
import json
import os
from datetime import datetime
from pathlib import Path
from google import genai

GAMESTATE_PATH = Path(__file__).parent / "gamestate.json"

# Initialize Gemini client
client = genai.Client(api_key="AIzaSyC-jh1Ny2RcKNyf-_Mgrm6MX_i3rlZhU6s")

def load_game_state():
    if GAMESTATE_PATH.exists():
        with open(GAMESTATE_PATH, "r") as f:
            return json.load(f)
    return {"turns": []}

def save_game_state(state):
    with open(GAMESTATE_PATH, "w") as f:
        json.dump(state, f, indent=2)

def handle_player_command(player_input: str):
    """Generate DM response and update game state."""
    state = load_game_state()

    # Construct AI prompt
    prompt = f"""
You are the Dungeon Master for a Dungeons & Dragons session.
Continue the story based on the player's action.

Player says: "{player_input}"

Scene so far:
{state.get("scene", {}).get("desc", "No scene set yet.")}

Respond narratively with rich description.
    """

    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=prompt,
    )
    dm_reply = response.text.strip()

    new_turn = {
        "turn_id": len(state.get("turns", [])) + 1,
        "actor": "player",
        "input": player_input,
        "dm_reply": dm_reply,
        "timestamp": datetime.now().isoformat(),
    }

    state.setdefault("turns", []).append(new_turn)
    save_game_state(state)
    return {"dm_reply": dm_reply, "turn": new_turn}
