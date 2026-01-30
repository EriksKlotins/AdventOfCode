"""
Day 1, Part 1.

The attached document (your puzzle input) contains a sequence of rotations, one
per line, which tell you how to open the safe.
"""

from __future__ import annotations

from typing import Sequence

from src.shared import parse_rotation, read_input


DIAL_SIZE = 100
DEFAULT_INITIAL_POSITION = 50
INPUT_FILENAME = "../input.txt"


def decode_password(
    rotations: Sequence[str],
    initial_position: int = DEFAULT_INITIAL_POSITION,
) -> int:
    """
    Apply the given rotations and return how many times the dial points exactly
    at 0 on a DIAL_SIZE-position circular dial.
    """
    position = initial_position
    zero_hits = 0

    for rotation in rotations:
        sign, distance = parse_rotation(rotation)
        position += sign * distance
        if position % DIAL_SIZE == 0:
            zero_hits += 1

    return zero_hits


def main() -> None:
    rotations = read_input(INPUT_FILENAME)
    answer = decode_password(rotations)
    print("Your puzzle answer is", answer)


if __name__ == "__main__":
    main()

