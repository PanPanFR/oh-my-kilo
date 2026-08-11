# Commands Reference

oh-my-kilo ships two slash commands: `/update-pack` and `/install-pack`.

### Locating the pack repo

Both `/install-pack` and `/update-pack` locate the repo clone (which may be anywhere on disk) using the same ordered strategy, validating each candidate as a git repo whose `origin` remote matches `https://github.com/PanPanFR/oh-my-kilo.git`:

1. Explicit `/command <path>` argument
2. Marker file `~/.config/kilo/.pack-repo` (written on every install/sync)
3. Active open file / working directory inside the repo
4. Well-known locations (`~/.config/kilo/oh-my-kilo`, `~/oh-my-kilo`, `~/Documents/oh-my-kilo`, `~/repos/oh-my-kilo`, `~/Projects/oh-my-kilo`, `~/code/oh-my-kilo`, `~/dev/oh-my-kilo`)
5. Fallback: `/install-pack` clones to the default location; `/update-pack` asks the user for the path

## `/install-pack`

**Description:** AI-assisted pack installation — the alternative to the manual Quick Start steps. The agent clones the repo if missing, backs up your existing config (`kilo.backup-<timestamp>`), copies pack folders into `~/.config/kilo`, registers every rule in `kilo.jsonc` `instructions`, sets `skills.paths`, and verifies the result.

**Implementation:** `command/install-pack.md`

| Args | Effect |
|------|--------|
| *(none)* | Use `~/.config/kilo/oh-my-kilo` as the pack repo; clone if missing |
| `<path>` | Use the given path as an existing pack repo |

### Examples

```
/install-pack
/install-pack C:\Users\me\oh-my-kilo
```

### Notes

- Never deletes or overwrites files outside the pack folders (`agents/`, `command/`, `rules/`, `skills/`, `AGENTS.md`).
- Only touches `instructions` and `skills.paths` in an existing `kilo.jsonc`.
- If the pack is already installed, the command reports it and suggests `/update-pack` for updates instead.
