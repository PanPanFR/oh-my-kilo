# Contributing

Thanks for considering contributing to oh-my-kilo!

## What to contribute

- **Bug reports** — something broken in an agent, skill, rule, or the install docs
- **Install issues** — steps that don't work on your platform
- **Agent suggestions** — better prompts, clearer roles, missing delegation patterns
- **Skill suggestions** — well-known community workflows missing from the pack
- **Documentation** — anything unclear in the README or `docs/`

## How to contribute

1. **Open an issue** first for bugs and suggestions — describe what you expected and what happened.
2. **For prompt/skill fixes**, open a PR directly. Keep changes focused: one agent, one skill, or one rule per PR.
3. **Language**: all file contents in English (per the pack's own `language` rule).

## Before opening a PR

- If you change an agent, skill, or rule, make sure the corresponding section in the README / `docs/` stays in sync
- If you add a skill, follow the existing structure under `skills/<name>/SKILL.md`
- Run a quick sanity check: `bash -n` on any shell scripts you touch

## Reporting security issues

Do **not** open a public issue for security vulnerabilities. Report via GitHub Security Advisories: https://github.com/PanPanFR/oh-my-kilo/security/advisories
