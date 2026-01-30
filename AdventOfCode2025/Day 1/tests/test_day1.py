from __future__ import annotations

import pytest

from src.part1 import decode_password, DEFAULT_INITIAL_POSITION
from src.part2 import apply_rotation, parse_rotations, DIAL_SIZE as DIAL_SIZE_PART2
from src.shared import read_input, direction_to_sign, parse_rotation


def test_direction_to_sign_valid() -> None:
    assert direction_to_sign("R") == 1
    assert direction_to_sign("L") == -1


def test_direction_to_sign_invalid() -> None:
    with pytest.raises(ValueError):
        direction_to_sign("X")


def test_parse_rotation_valid() -> None:
    assert parse_rotation("R10") == (1, 10)
    assert parse_rotation("L5") == (-1, 5)


def test_parse_rotation_too_short() -> None:
    with pytest.raises(ValueError):
        parse_rotation("R")
    with pytest.raises(ValueError):
        parse_rotation("")


def test_parse_rotation_invalid_distance() -> None:
    with pytest.raises(ValueError):
        parse_rotation("Rxx")


def test_read_input_missing_file_raises() -> None:
    with pytest.raises(FileNotFoundError):
        read_input("./does_not_exist.txt")


def test_read_input_loads_test_input() -> None:
    # Uses the existing Day 1 test input file to ensure basic functionality.
    lines = read_input("./test_input.txt")
    assert isinstance(lines, list)
    assert len(lines) > 0
    assert all(isinstance(line, str) for line in lines)


def test_decode_password_example_sequence() -> None:
    # Example from the problem description:
    example_rotations = [
        "L68",
        "L30",
        "R48",
        "L5",
        "R60",
        "L55",
        "L1",
        "L99",
        "R14",
        "L82",
    ]

    # The dial starts at 50 and should point at 0 three times.
    assert decode_password(example_rotations, initial_position=DEFAULT_INITIAL_POSITION) == 3


def test_parse_rotations_uses_shared_parser() -> None:
    lines = ["R10", "L5"]
    parsed = parse_rotations(lines)
    assert parsed == [(1, 10), (-1, 5)]


def test_apply_rotation_right_rotation_zero_crossing() -> None:
    # Starting at 0, a full rotation should yield one zero crossing and end at 0.
    position, zero_hits = apply_rotation(0, 1, DIAL_SIZE_PART2)
    assert position == 0
    assert zero_hits == 1


def test_apply_rotation_left_rotation_zero_crossing() -> None:
    # Same as above but rotating left; still one zero crossing and back to 0.
    position, zero_hits = apply_rotation(0, -1, DIAL_SIZE_PART2)
    assert position == 0
    assert zero_hits == 1


