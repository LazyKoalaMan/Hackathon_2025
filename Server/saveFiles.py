# save/load session JSONs# backend/saveFiles.py
import json
from datetime import datetime
from pathlib import Path

# Directory where all session files will be saved
SESSIONS_DIR = Path(__file__).parent / "sessions"
SESSIONS_DIR.mkdir(exist_ok=True)

def list_sessions():
    """Return a list of all saved session file names."""
    return [f.stem for f in SESSIONS_DIR.glob("*.json")]

def session_path(session_id: str) -> Path:
    """Generate the full path for a session file."""
    return SESSIONS_DIR / f"{session_id}.json"

def create_new_session(campaign_name: str = "New Campaign") -> dict:
    """Create a new game session and save it as JSON."""
    session_id = f"sess-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
    data = {
        "campaign_id": campaign_name.lower().replace(" ", "-"),
        "session_id": session_id,
        "created_at": datetime.now().isoformat(),
        "scene": {
            "title": "The Beginning",
            "desc": "Your party stands on the edge of adventure..."
        },
        "party": [],
        "turns": [],
        "last_llm_tokens": 0
    }

    with open(session_path(session_id), "w") as f:
        json.dump(data, f, indent=2)

    return data

def load_session(session_id: str) -> dict:
    """Load an existing session by ID."""
    path = session_path(session_id)
    if not path.exists():
        raise FileNotFoundError(f"Session '{session_id}' not found.")
    with open(path, "r") as f:
        return json.load(f)

def save_session(session_id: str, state: dict):
    """Save the current state to the session JSON."""
    path = session_path(session_id)
    with open(path, "w") as f:
        json.dump(state, f, indent=2)

def delete_session(session_id: str) -> bool:
    """Delete a session permanently."""
    path = session_path(session_id)
    if path.exists():
        path.unlink()
        return True
    return False
