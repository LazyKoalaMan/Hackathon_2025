# folder where saved session JSONs go
# backend/SaveStorages.py
import json
from datetime import datetime
from pathlib import Path


# -------------------------------------------------------------
# Folder where saved session JSONs go
# -------------------------------------------------------------
SAVE_FOLDER = Path(__file__).parent / "saves"
SAVE_FOLDER.mkdir(exist_ok=True)  # create folder if missing


# -------------------------------------------------------------
# Helper functions for session storage management
# -------------------------------------------------------------

def _get_save_path(filename: str) -> Path:
    """Get full path for a given save file name."""
    if not filename.endswith(".json"):
        filename += ".json"
    return SAVE_FOLDER / filename


def list_saves():
    """List all saved sessions (returns list of dicts with name + date)."""
    saves = []
    for file in SAVE_FOLDER.glob("*.json"):
        saves.append({
            "name": file.stem,
            "modified": datetime.fromtimestamp(file.stat().st_mtime).isoformat()
        })
    return sorted(saves, key=lambda s: s["modified"], reverse=True)


def create_save(data: dict, filename: str = None) -> dict:
    """Create a new save file with session data."""
    if filename is None:
        filename = f"session-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
    save_path = _get_save_path(filename)
    with open(save_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    return {"saved_as": filename, "path": str(save_path)}


def load_save(filename: str) -> dict:
    """Load a specific session save by filename."""
    path = _get_save_path(filename)
    if not path.exists():
        raise FileNotFoundError(f"Save file '{filename}' not found.")
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def update_save(filename: str, new_data: dict):
    """Overwrite an existing save file with new session data."""
    path = _get_save_path(filename)
    if not path.exists():
        raise FileNotFoundError(f"Save file '{filename}' not found.")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(new_data, f, indent=2)


def delete_save(filename: str):
    """Delete a specific save file."""
    path = _get_save_path(filename)
    if path.exists():
        path.unlink()
        return True
    return False
