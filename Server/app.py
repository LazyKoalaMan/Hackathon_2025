from flask import Flask, request, jsonify
from flask_cors import CORS
import os, json
import google.generativeai as genai
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

SAVE_FILE = "saves/current_session.json"

# Helper to load or initialize game state
def load_game_state():
    if not os.path.exists(SAVE_FILE):
        return {"log": [], "player_name": "Unknown Adventurer"}
    with open(SAVE_FILE, "r") as f:
        return json.load(f)

def save_game_state(state):
    os.makedirs("saves", exist_ok=True)
    with open(SAVE_FILE, "w") as f:
        json.dump(state, f, indent=2)

@app.route("/api/player-input", methods=["POST"])
def handle_player_input():
    data = request.json
    command = data.get("command", "").strip()
    player_name = data.get("player_name", "Unknown Adventurer")

    if not command:
        return jsonify({"error": "No command provided"}), 400

    # Load previous story log
    game_state = load_game_state()
    history = "\n".join([f"{entry['speaker']}: {entry['text']}" for entry in game_state["log"]])

    # Construct prompt for Gemini
    prompt = f"""
You are Gemnai, the Dungeon Master of a Dungeons & Dragons story.
Continue narrating based on the following history and player input.

Story so far:
{history}

Player ({player_name}) says: "{command}"

Respond as a creative Dungeon Master, describing the world and outcomes clearly.
Keep it immersive and narrative-driven, around 3–6 sentences.
"""

    try:
        response = model.generate_content(prompt)
        ai_reply = response.text.strip()

        # Update log
        game_state["log"].append({"speaker": player_name, "text": command, "time": datetime.now().isoformat()})
        game_state["log"].append({"speaker": "Gemnai", "text": ai_reply, "time": datetime.now().isoformat()})
        save_game_state(game_state)

        return jsonify({"reply": ai_reply, "log": game_state["log"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/load-game", methods=["GET"])
def load_game():
    game_state = load_game_state()
    return jsonify(game_state)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
