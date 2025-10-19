# dice.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route("/api/roll", methods=["POST"])
def roll_dice():
    data = request.get_json()
    dice_type = data.get("dice_type", 20)  # Default: D20
    result = random.randint(1, dice_type)
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
