---
description: Pull latest changes from GitHub and update the oh-my-kilo pack in the Kilo config
---

Pull the latest changes from GitHub and update the oh-my-kilo pack in the Kilo config.

## Step 1 — Locate the pack repo

Find the repo in this order, validating each candidate as a git repo whose `origin` remote matches `https://github.com/PanPanFR/oh-my-kilo.git` (check with `git -C <path> remote get-url origin`):

1. **Explicit argument** — if `/update-pack <path>` was given, validate and use that path.
2. **Marker file** — read `~/.config/kilo/.pack-repo`. Validate and use if it points at a valid repo.
3. **Active file / working directory** — if the currently open file or the agent's working directory is inside a git repo matching the pack URL, use that repo root.
4. **Well-known locations**, first match wins: `~/.config/kilo/oh-my-kilo`, `~/oh-my-kilo`, `~/Documents/oh-my-kilo`, `~/repos/oh-my-kilo`, `~/Projects/oh-my-kilo`, `~/code/oh-my-kilo`, `~/dev/oh-my-kilo`.
5. **Not found** — tell the user to clone the repo first (`git clone https://github.com/PanPanFR/oh-my-kilo.git ~/.config/kilo/oh-my-kilo`) and stop.

## Step 2 — Pull latest changes

Run `git pull --ff-only` in the located repo. Handle three outcomes:

- **Fast-forward succeeded** — there are new changes. Continue to step 3.
- **Already up-to-date** — skip to step 5 and report "Pack is already up-to-date. No changes needed."
- **Diverged / merge conflict** — run `git fetch origin && git reset --hard origin/main` (local repo is a pack clone, not user code — hard reset is safe). If this also fails, report the error and stop.

## Step 3 — Sync folders

Copy from the repo into `~/.config/kilo`: `agents/`, `command/`, `plugins/`, `rules/`, `skills/` (recursive, overwrite). Copy `AGENTS.md` to the config root. If a new plugin file appears and the config's **global** `kilo.jsonc` has no `plugin` entry for it, add the `file:///` registration there (never in project-scope configs).

## Step 4 — Register rules

Open the config `kilo.jsonc`. For every `.md` file in the config `rules/` folder, ensure `"rules/<filename>"` is present in the `instructions` array. Add any missing entries (keep existing entries and their formatting; do not remove user-added instructions). Preserve the rest of `kilo.jsonc` untouched.

## Step 5 — Verify `skills.paths`

Make sure `skills.paths` in `kilo.jsonc` includes the config `skills` folder (`C:\Users\<user>\.config\kilo\skills` on Windows). Add it if missing.

## Step 6 — Refresh the repo marker

Rewrite `~/.config/kilo/.pack-repo` with the absolute path of the repo used (single line, no trailing newline).

## Step 7 — Report

- If there were new changes: list what was copied, which rules were added to `instructions`, and show a short summary of what changed in the repo (from `git log --oneline -5` or the pull output). Tell the user to start a new Kilo session or run `/reload`.
- If already up-to-date: say so, no further action needed.

## Rules

- Only touch `kilo.jsonc` `instructions` and `skills.paths` — never edit other keys in that file.
- Never delete or rename files in the config that are not part of the pack (user customizations stay).

## Examples

- `/update-pack`
- `/update-pack C:\Users\me\oh-my-kilo`
