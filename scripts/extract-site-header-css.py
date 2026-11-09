"""Extract every styles.css rule that styles the main site header into one file."""
import re, sys
from pathlib import Path
src = Path(sys.argv[1]).read_text()
KEYS = re.compile(r"site-header|site-nav|\.brand\b|\.brand-|header-actions|nav-toggle|theme-toggle|header-account|nav-account|nav-enitexa|nav-recruit|nav-about|nav-open|menu-open|drawer|nav-backdrop|nav-locked")

def blocks(css):
    """Yield (prelude, body) for top-level blocks, handling nesting."""
    i, n = 0, len(css)
    while i < n:
        j = css.find("{", i)
        if j < 0: break
        prelude = css[i:j].strip()
        depth, k = 1, j + 1
        while depth and k < n:
            if css[k] == "{": depth += 1
            elif css[k] == "}": depth -= 1
            k += 1
        yield prelude, css[j + 1:k - 1]
        i = k

def strip_comments(s): return re.sub(r"/\*.*?\*/", "", s, flags=re.S)

out = []
def walk(css, wrap=None):
    for prelude, body in blocks(css):
        if prelude.startswith("@media") or prelude.startswith("@supports"):
            inner = []
            for p2, b2 in blocks(body):
                if KEYS.search(p2): inner.append(f"{p2}{{{b2.strip()}}}")
            if inner: out.append(f"{prelude}{{\n" + "\n".join(inner) + "\n}")
        elif prelude.startswith("@keyframes") or prelude.startswith("@font-face") or prelude.startswith("@"):
            continue
        elif KEYS.search(prelude):
            out.append(f"{prelude}{{{body.strip()}}}")
walk(strip_comments(src))
Path(sys.argv[2]).write_text("\n".join(out) + "\n")
print(len(out), "rules/blocks,", len("\n".join(out)), "bytes")
