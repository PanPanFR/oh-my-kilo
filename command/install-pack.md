---
description: Install oh-my-kilo pack into the Kilo config (clone, copy, register rules) — AI-assisted alternative to manual install
---

Install the oh-my-kilo pack into the Kilo config directory. This is an AI-assisted alternative to the manual copy-paste steps in `docs/INSTALL.md` — do not remove or modify those instructions.

## Steps

1. **Locate or clone the pack repo.** If `~/.config/kilo/oh-my-kilo` (Windows: `C:\Users\<user>\.config\kilo\oh-my-kilo`) already exists and is a git repo, use it as-is. Otherwise clone it:
   ```
   git clone https://github.com/PanPanFR/oh-my-kilo.git ~/.config/kilo/oh-my-kilo
   ```
   If an argument is given to `/install-pack`, treat it as an existing pack repo path instead. If cloning fails, report the error and stop.
2. **Backup existing config.** Copy whatever exists in `~/.config/kilo` among `agents`, `rules`, `skills`, and `AGENTS.md` into `~/.config/kilo.backup-<yyyyMMdd-HHmmss>` (only copy what exists; never delete the originals). Skip this step if the backup folder for that timestamp already exists.
3. **Copy pack folders** from the repo into `~/.config/kilo`: `agents/`, `command/`, `rules/`, `skills/` (recursive, overwrite). Copy `AGENTS.md` to the config root. Do not copy `docs/`, `README.md`, `LICENSE`, or other repo root files — they are pack documentation, not runtime config.
4. **Register rules.** Locate the config `kilo.jsonc`. For every `.md` file in the config `rules/` folder, ensure `"rules/<filename>"` is present in the `instructions` array; add missing entries, keep existing entries. If `kilo.jsonc` does not exist, create one with a minimal `instructions` block containing all rules. Never edit other keys (provider, model, mcp, agent, permission, etc.).
5. **Configure `skills.paths`.** Ensure `skills.paths` in `kilo.jsonc` includes the config `skills` folder (`C:\Users\<user>\.config\kilo\skills` on Windows). Add it if missing.
6. **Verify.** Confirm all seven rule files from `skills.md`'s table are present in the config `rules/` and registered in `instructions`; confirm `command/graphify.md` and `command/sync-pack.md` exist in the config; confirm `skills.paths` points at the config `skills` folder.
7. **Report.** Summarize: backup location, folders copied, rules registered, skills.paths status. Tell the user to start a new Kilo session or run `/reload`.

## Rules

- Never delete or overwrite user files outside the pack folders listed above.
- If `kilo.jsonc` exists with user content, only touch `instructions` and `skills.paths`.
- If the same pack appears already installed (all folders present and all rules registered), say so and only offer `/sync-pack` for updates instead of reinstalling.

## Examples

- `/install-pack`
- `/install-pack C:\Users\me\oh-my-kilo`