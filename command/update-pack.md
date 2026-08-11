---
description: Update oh-my-kilo pack in the Kilo config and register rules in kilo.jsonc
---

Update the oh-my-kilo pack in the Kilo config directory and register all rules in `kilo.jsonc`.

## Step 1 — Locate the pack repo

The user may have cloned the repo anywhere. Find it in this order, validating each candidate (must be a git repo whose `origin` remote matches `https://github.com/PanPanFR/oh-my-kilo.git` — check with `git -C <path> remote get-url origin`):

1. **Explicit argument** — if `/update-pack <path>` was given, validate and use that path.
2. **Marker file** — read `~/.config/kilo/.pack-repo` (written by `/install-pack` or a previous sync). Validate and use if it points at a valid repo.
3. **Active file / working directory** — if the currently open file or the agent's working directory is inside a git repo matching the pack URL, use that repo root.
4. **Well-known locations**, first match wins: `~/.config/kilo/oh-my-kilo`, `~/oh-my-kilo`, `~/Documents/oh-my-kilo`, `~/repos/oh-my-kilo`, `~/Projects/oh-my-kilo`, `~/code/oh-my-kilo`, `~/dev/oh-my-kilo`.
5. **Not found** — do NOT clone silently. Ask the user for the repo path (they may have customizations or a fork). If they have no clone, offer to clone to the default `~/.config/kilo/oh-my-kilo` and run `/install-pack` instead.

## Step 2 — Sync folders

Copy from the located repo into `~/.config/kilo`: `agents/`, `command/`, `rules/`, `skills/` (recursive, overwrite). Copy `AGENTS.md` to the config root.

## Step 3 — Register rules

Open the config `kilo.jsonc`. For every `.md` file in the config `rules/` folder, ensure `"rules/<filename>"` is present in the `instructions` array. Add any missing entries (keep existing entries and their formatting; do not remove user-added instructions). Preserve the rest of `kilo.jsonc` untouched — provider, models, mcp, agent, permission, skills.paths all stay as-is.

## Step 4 — Verify `skills.paths`

Make sure `skills.paths` in `kilo.jsonc` includes the config `skills` folder (`C:\Users\<user>\.config\kilo\skills` on Windows). Add it if missing.

## Step 5 — Refresh the repo marker

Rewrite `~/.config/kilo/.pack-repo` with the absolute path of the repo used (single line, no trailing newline), so future syncs keep working even if the config or clone moves.

## Step 6 — Report

List what was copied and which rules were added to `instructions`. Tell the user to start a new Kilo session or run `/reload` for changes to take effect.

## Rules

- Only touch `kilo.jsonc` `instructions` and `skills.paths` — never edit other keys in that file.
- Never delete or rename files in the config that are not part of the pack (user customizations stay).
- If `kilo.jsonc` does not exist in the config, create it with a minimal `instructions` block containing all rules from the `rules/` folder.

## Examples

- `/update-pack`
- `/update-pack C:\Users\me\oh-my-kilo`