---
description: Install oh-my-kilo pack into the Kilo config (clone, copy, register rules) — AI-assisted alternative to manual install
---

Install the oh-my-kilo pack into the Kilo config directory. This is an AI-assisted alternative to the manual copy-paste steps in `docs/INSTALL.md` — do not remove or modify those instructions.

## Step 1 — Locate the pack repo

The user may have cloned the repo anywhere. Find it in this order, validating each candidate (must be a git repo whose `origin` remote matches `https://github.com/PanPanFR/oh-my-kilo.git` — check with `git -C <path> remote get-url origin`):

1. **Explicit argument** — if `/install-pack <path>` was given, validate and use that path.
2. **Marker file** — read `~/.config/kilo/.pack-repo` (written by a previous install). Validate and use if it points at a valid repo.
3. **Active file / working directory** — if the currently open file or the agent's working directory is inside a git repo matching the pack URL, use that repo root.
4. **Well-known locations**, first match wins: `~/.config/kilo/oh-my-kilo`, `~/oh-my-kilo`, `~/Documents/oh-my-kilo`, `~/repos/oh-my-kilo`, `~/Projects/oh-my-kilo`, `~/code/oh-my-kilo`, `~/dev/oh-my-kilo`.
5. **Not found** — for install: clone the repo to the default location `~/.config/kilo/oh-my-kilo`:
   ```
   git clone https://github.com/PanPanFR/oh-my-kilo.git ~/.config/kilo/oh-my-kilo
   ```
   If cloning fails, report the error and stop. (If the user prefers an existing clone elsewhere, ask for its path instead.)

## Step 2 — Backup existing config

Copy whatever exists in `~/.config/kilo` among `agents`, `rules`, `skills`, and `AGENTS.md` into `~/.config/kilo.backup-<yyyyMMdd-HHmmss>` (only copy what exists; never delete the originals). Skip this step if the backup folder for that timestamp already exists.

## Step 3 — Copy pack folders

Copy from the located repo into `~/.config/kilo`: `agents/`, `command/`, `rules/`, `skills/` (recursive, overwrite). Copy `AGENTS.md` to the config root. Do not copy `docs/`, `README.md`, `LICENSE`, or other repo root files — they are pack documentation, not runtime config.

## Step 4 — Register rules

Locate the config `kilo.jsonc`. For every `.md` file in the config `rules/` folder, ensure `"rules/<filename>"` is present in the `instructions` array; add missing entries, keep existing entries. If `kilo.jsonc` does not exist, create one with a minimal `instructions` block containing all rules. Never edit other keys (provider, model, mcp, agent, permission, etc.).

## Step 5 — Configure `skills.paths`

Ensure `skills.paths` in `kilo.jsonc` includes the config `skills` folder (`C:\Users\<user>\.config\kilo\skills` on Windows). Add it if missing.

## Step 6 — Write the repo marker

Write the absolute path of the located repo to `~/.config/kilo/.pack-repo` (single line, no trailing newline). This lets `/update-pack` find the repo later regardless of clone location.

## Step 7 — Verify and report

Confirm all seven rule files are present in the config `rules/` and registered in `instructions`; confirm `command/graphify.md`, `command/update-pack.md`, and `command/install-pack.md` exist in the config; confirm `skills.paths` points at the config `skills` folder. Summarize: repo location used, marker written, backup location, folders copied, rules registered, skills.paths status. Tell the user to start a new Kilo session or run `/reload`.

## Rules

- Never delete or overwrite user files outside the pack folders listed above.
- If `kilo.jsonc` exists with user content, only touch `instructions` and `skills.paths`.
- If the same pack appears already installed (all folders present and all rules registered), say so and only offer `/update-pack` for updates instead of reinstalling.

## Examples

- `/install-pack`
- `/install-pack C:\Users\me\oh-my-kilo`