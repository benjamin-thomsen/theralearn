#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEST_DIRECTORY="$(mktemp -d)"
trap 'rm -rf "$TEST_DIRECTORY"' EXIT

mkdir -p "$TEST_DIRECTORY/bin"

cat > "$TEST_DIRECTORY/bin/codex" <<'SCRIPT'
#!/usr/bin/env bash
printf '%s\n' "$@" > "$CODEX_ARGUMENTS_OUTPUT"
exit "$FAKE_CODEX_EXIT_CODE"
SCRIPT

cat > "$TEST_DIRECTORY/bin/git" <<'SCRIPT'
#!/usr/bin/env bash
printf '%s\n' "$*" >> "$GIT_CALLS_OUTPUT"
exit 99
SCRIPT

cat > "$TEST_DIRECTORY/bin/osascript" <<'SCRIPT'
#!/usr/bin/env bash
printf '%s\n' "$@" > "$OSASCRIPT_ARGUMENTS_OUTPUT"
exit 0
SCRIPT

chmod +x "$TEST_DIRECTORY/bin/"*

: > "$TEST_DIRECTORY/git-calls"
PATH="$TEST_DIRECTORY/bin:$PATH" FAKE_CODEX_EXIT_CODE=0 CODEX_ARGUMENTS_OUTPUT="$TEST_DIRECTORY/codex-arguments" GIT_CALLS_OUTPUT="$TEST_DIRECTORY/git-calls" OSASCRIPT_ARGUMENTS_OUTPUT="$TEST_DIRECTORY/osascript-arguments" "$PROJECT_ROOT/scripts/codex-notify" "Test task"
[[ ! -s "$TEST_DIRECTORY/git-calls" ]]
printf "codex-notify tests PASS\n"
: > "$TEST_DIRECTORY/git-calls"
set +e
PATH="$TEST_DIRECTORY/bin:$PATH" FAKE_CODEX_EXIT_CODE=7 CODEX_ARGUMENTS_OUTPUT="$TEST_DIRECTORY/codex-arguments" GIT_CALLS_OUTPUT="$TEST_DIRECTORY/git-calls" OSASCRIPT_ARGUMENTS_OUTPUT="$TEST_DIRECTORY/osascript-arguments" "$PROJECT_ROOT/scripts/codex-notify" "Failure test"
rc=$?
set -e
[[ "$rc" -eq 7 ]]
[[ ! -s "$TEST_DIRECTORY/git-calls" ]]
printf "codex-notify failure-path PASS\n"
