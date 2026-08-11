---
description: Sync oh-my-kilo pack files into the Kilo config and register rules in kilo.jsonc
---

Sync the oh-my-kilo pack into the Kilo config directory and register all rules in `kilo.jsonc`.

## Steps

1. **Locate the pack repo.** Default: `~/.config/kilo/oh-my-kilo` (Windows: `C:\Users\<user>\.config\kilo\oh-my-kilo`). If an argument is given to `/sync-pack`, treat it as the pack repo path instead. If the repo is missing, tell the user where to clone it (`git clone https://github.com/PanPanFR/oh-my-kilo.git`) and stop.
2. **Sync folders** from the pack repo into `~/.config/kilo`: `agents/`, `command/`, `rules/`, `skills/` (copy recursively, overwrite). Copy `AGENTS.md` to the config root.
3. **Register rules.** Open the config `kilo.jsonc`. For every `.md` file in the config `rules/` folder, ensure `"rules/<filename>"` is present in the `instructions` array. Add any missing entries (keep existing entries and their formatting; do not remove user-added instructions). Preserve the rest of `kilo.jsonc` untouched — provider, models, mcp, agent, permission, skills.paths all stay as-is.
4. **Verify `skills.paths`.** Make sure `skills.paths` in `kilo.jsonc` includes the config `skills` folder (`C:\Users\<user>\.config\kilo\skills` on Windows). Add it if missing.
5. **Report.** List what was copied and which rules were added to `instructions`. Tell the user to start a new Kilo session or run `/reload` for changes to take effect.

## Rules

- Only touch `kilo.jsonc` `instructions` and `skills.paths` — never edit other keys in that file.
- Never delete or rename files in the config that are not part of the pack (user customizations stay).
- If `kilo.jsonc` does not exist in the config, create it with a minimal `instructions` block containing all rules from the `rules/` folder.

## Examples

- `/sync-pack`
- `/sync-pack C:\Users\me\oh-my-kilo`
