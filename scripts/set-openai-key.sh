#!/bin/sh
set -eu


printf "Indtast OPENAI_API_KEY (skjult): "
stty -echo
IFS= read -r OPENAI_API_KEY
stty echo
printf "\n"

if [ -z "$OPENAI_API_KEY" ]; then
  echo "FAIL: OPENAI_API_KEY må ikke være tom."
  exit 1
fi

TMP_FILE="$(mktemp)"

if [ -f .env.local ]; then
  grep -v "^OPENAI_API_KEY=" .env.local > "$TMP_FILE" || true
fi

printf "%s\n" "OPENAI_API_KEY=$OPENAI_API_KEY" >> "$TMP_FILE"
mv "$TMP_FILE" .env.local

if grep -q "^OPENAI_API_KEY=sk-" .env.local; then
  echo "PASS: OPENAI_API_KEY blev gemt sikkert i .env.local"
else
  echo "FAIL: OPENAI_API_KEY blev ikke gemt."
  exit 1
fi
