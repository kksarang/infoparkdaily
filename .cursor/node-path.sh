#!/usr/bin/env bash
# Prefer Node 24+ for this repo; the platform node may be older and appear first on PATH.
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ -s "$NVM_DIR/nvm.sh" ]]; then
  # shellcheck source=/dev/null
  . "$NVM_DIR/nvm.sh"
  nvm use 24 >/dev/null 2>&1 || nvm install 24
  export PATH="$(dirname "$(nvm which 24)"):$(echo "$PATH" | tr ':' '\n' | grep -v '/exec-daemon' | paste -sd:)"
fi
