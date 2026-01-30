from __future__ import annotations

import sys
from pathlib import Path


# Ensure the Day 1 directory (which contains the `src/` package) is on sys.path
# so `import src...` works regardless of where pytest is invoked from.
DAY1_ROOT = Path(__file__).resolve().parent.parent
if str(DAY1_ROOT) not in sys.path:
    sys.path.insert(0, str(DAY1_ROOT))






