# Commands Reference

oh-my-kilo ships one slash command: `/update-pack`.

## Locating the pack repo

`/update-pack` locates the repo clone (which may be anywhere on disk) using an ordered strategy, validating each candidate as a git repo whose `origin` remote matches `https://github.com/PanPanFR/oh-my-kilo.git`:

1. Explicit `/update-pack <path>` argument
2. Marker file `~/.config/kilo/.pack-repo` (written on every sync)
3. Active open file / working directory inside the repo
4. Well-known locations (`~/.config/kilo/oh-my-kilo`, `~/oh-my-kilo`, `~/Documents/oh-my-kilo`, `~/repos/oh-my-kilo`, `~/Projects/oh-my-kilo`, `~/code/oh-my-kilo`, `~/dev/oh-my-kilo`)
5. Not found — tells the user to clone the repo first

## `/update-pack`

**Description:** Pull the latest changes from GitHub and sync the pack into `~/.config/kilo`. Handles git pull, folder sync, rules registration, and `skills.paths` verification in one command.

**Implementation:** `command/update-pack.md`

| Args | Effect |
|------|--------|
| *(none)* | Use the detected pack repo; pull + sync |
| `<path>` | Use the given path as the pack repo |

### Examples

```
/update-pack
/update-pack C:\Users\me\oh-my-kilo
```

### What it does

1. Pulls latest changes from GitHub (`git pull --ff-only`; hard-resets if diverged)
2. Copies `agents/`, `command/`, `rules/`, `skills/`, `AGENTS.md` into `~/.config/kilo`
3. Registers all rules in `kilo.jsonc` `instructions`
4. Verifies `skills.paths`
5. Reports what changed (or "already up-to-date")
