# Security Policy

## Reporting a Vulnerability

If you discover a security issue in this pack, please open a GitHub issue or contact the maintainers directly.

## Credential Safety

- The pack ships **zero credentials, zero API keys, zero secrets**. No `kilo.jsonc`, `.env`, or other config file is included — the pack is prompts, rules, commands, skills, and docs only.
- Config blocks (providers, MCPs, permissions) are documented in `docs/CONFIGURATION.md` as a reference. Any secret-bearing value you add should use `{env:VAR}` placeholders, which Kilo resolves at startup only when the config resides in a trusted location (`~/.config/kilo/`).
- The documented `mcp` setup includes only **credential-free MCPs**: `chrome-devtools`, `cloudflare`, `agentmemory`.
- Credential-bearing MCPs (`context7`, `supabase`, `perplexity`, `tinypuppet`) and the `indexing` block are intentionally excluded from the pack. See `docs/CONFIGURATION.md` for instructions on adding them back with your own `{env:...}` placeholders.

## If You Suspect a Leak

1. **Rotate all keys** shown in the leaked content immediately.
2. **Report** the leak via GitHub issue.
3. Do NOT push the leaked content further.

## Review Before Trusting

- The `permission` block documented in `docs/CONFIGURATION.md` is an **opinionated default**. Review it before installing to ensure it aligns with your security posture.
- Third-party skills (in `skills/`) are bundled as-is from community packs. Review them before enabling.

## Secret Scanning

The repository relies on:

- `.gitignore` guards that exclude real config (`kilo.jsonc`, `.env`) from ever being committed.
- Manual review before push — check `git status` and `git diff` output for literal secrets.
- Recommended: run a scanner locally before pushing (e.g. `gitleaks git` or `trufflehog git --since-commit HEAD~1`).

Any push containing a literal secret should be caught by these gates.
