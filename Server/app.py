# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from gemnai_client import handle_player_command

app = Flask(__name__)
CORS(app)

@app.route("/api/command", methods=["POST"])
def command():
    data = request.get_json()
    player_input = data.get("playerInput", "")
    if not player_input:
        return jsonify({"error": "Missing input"}), 400

    try:
        result = handle_player_command(player_input)
        return jsonify(result)
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "AI generation failed"}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
