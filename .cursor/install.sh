#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=/dev/null
source "$ROOT/.cursor/node-path.sh"

node -v | grep -qE '^v(2[4-9]|[3-9][0-9])' || {
  echo "Node.js 24+ is required (see package.json engines)." >&2
  exit 1
}

cd "$ROOT"
npm ci
npm run build:community
npm run build:cloud
npx playwright install chromium
