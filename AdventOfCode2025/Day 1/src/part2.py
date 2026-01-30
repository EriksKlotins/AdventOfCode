from __future__ import annotations

from typing import Iterable, List, Tuple

from src.shared import parse_rotation, read_input


DIAL_SIZE = 100
INITIAL_POSITION = 50
INPUT_FILENAME = "./test_input.txt"


def parse_rotations(lines: Iterable[str]) -> List[Tuple[int, int]]:
    """
    Parse raw rotation strings into (sign, distance) tuples using the shared
    rotation parser.
    """
    return [parse_rotation(line) for line in lines]


def apply_rotation(position: int, sign: int, distance: int) -> Tuple[int, int]:
    """
    Apply a single rotation and return (new_position, zero_crossings).

    This mirrors the original algorithm but with clearer structure.
    """
    # For left rotations, flip the frame of reference to reuse the same math.
    if sign < 0:
        tmp_pos = (DIAL_SIZE - position) % DIAL_SIZE
    else:
        tmp_pos = position

    new_pos = (tmp_pos + distance) % DIAL_SIZE
    zero_hits = (tmp_pos + distance) // DIAL_SIZE

    if sign < 0:
        new_pos = (DIAL_SIZE - new_pos) % DIAL_SIZE

    return new_pos, zero_hits


def run() -> None:
    rotations = parse_rotations(read_input(INPUT_FILENAME))

    position = INITIAL_POSITION
    zeros = 0

    print(f"The dial starts by pointing at {position}")
    for sign, distance in rotations:
        position, zero_hits = apply_rotation(position, sign, distance)

        # Preserve the original print format for step-by-step output.
        print(f"The dial is rotated by {distance * sign} to point at {position}", end="\t\t")
        if zero_hits > 0:
            print(f"During this rotation, it points at 0 {zero_hits}x times", end="\t")
        print("")

        zeros += zero_hits

    print(zeros)


if __name__ == "__main__":
    run()

