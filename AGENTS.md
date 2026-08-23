<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# TheraLearn repository governance

- The repository and GitHub are authoritative for project state; `PROJECT_CONTROL.md` is authoritative for governance, the current task, and code-change permission.
- Product Authority and architecture authority remain upstream of implementation.
- Before modifying product code, read `PROJECT_CONTROL.md` and follow its current Code Change Gate and bounded authorized scope.
- Codex may inspect the repository, edit authorized files, review diffs, and run verification. It must not commit or push without explicit user approval.
- `./scripts/dev verify` is the canonical complete verification command.
- Do not require `./scripts/dev checkpoint` until its current hanging behavior is resolved.
- Minimize manual terminal and copy-paste work for the user by performing repository inspection, edits, diff review, and verification directly.
- After each bounded task, report changed files, the verification result, and any governance blocker.
