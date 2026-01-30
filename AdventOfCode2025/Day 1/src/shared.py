"""
Shared utilities for Day 1 solutions.
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import List, Tuple


def read_input(filename: str) -> List[str]:
    """
    Read and return non-empty, stripped lines from a text file located next to
    this module.

    The path is resolved relative to this module's directory so that it works
    regardless of the current working directory.

    Raises:
        FileNotFoundError: If the file doesn't exist next to this module.
    """
    # Resolve the file relative to this module's directory, not the CWD.
    script_dir = Path(__file__).resolve().parent
    file_path = script_dir / filename

    cwd = os.getcwd()

    # Check if file exists
    if not file_path.exists():
        print(f"DEBUG: Current working directory: {cwd}")
        print(f"DEBUG: Script/module directory: {script_dir}")
        print(f"DEBUG: Looking for file (relative): {filename}")
        print(f"DEBUG: Absolute path attempted: {file_path}")
        raise FileNotFoundError(
            f"Input file not found: {filename}\n"
            f"Current working directory: {cwd}\n"
            f"Script/module directory: {script_dir}\n"
            f"Absolute path: {file_path}"
        )

    with open(file_path) as file:
        return [line.rstrip() for line in file if line.strip()]


def direction_to_sign(direction: str) -> int:
    """Convert a rotation direction 'R' or 'L' into +1 or -1."""
    if direction not in ("R", "L"):
        raise ValueError(f"Unexpected rotation direction: {direction!r}")
    return 1 if direction == "R" else -1


def parse_rotation(rotation: str) -> Tuple[int, int]:
    """
    Parse a single rotation instruction into a (sign, distance) tuple.

    Example:
        'R48' -> (1, 48)
        'L30' -> (-1, 30)
    """
    if len(rotation) < 2:
        raise ValueError(f"Rotation instruction too short: {rotation!r}")

    direction = rotation[0]
    try:
        distance = int(rotation[1:])
    except ValueError as exc:
        raise ValueError(f"Invalid rotation distance in {rotation!r}") from exc

    sign = direction_to_sign(direction)
    return sign, distance



