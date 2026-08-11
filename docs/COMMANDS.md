# Commands Reference

oh-my-kilo ships three slash commands: `/graphify`, `/sync-pack`, and `/install-pack`.

## `/graphify`

**Description:** Build or query a graphify knowledge graph.

**Implementation:** `command/graphify.md` — the command body delegates to the `graphify` skill, passing the full argument string through unchanged.

### Usage

```
/graphify [args]
```

| Args | Effect |
|------|--------|
| *(none)* | Run the `graphify` skill on the current directory (default target `.`) |
| `<path> --update` | Build or refresh the knowledge graph for a path |
| `query "<question>"` | Query an existing graph |
| `path "<A>" "<B>"` | Show the relationship path between two nodes |
| `explain "<concept>"` | Get a focused explanation of a concept |

### Examples

```
/graphify
/graphify src --update
/graphify query "what connects auth to billing?"
/graphify path "auth" "billing"
/graphify explain "codebase_search"
```

### Prerequisites

- The `graphify` CLI must be installed (`npm i -g graphify` or via your package manager).
- For `query` / `path` / `explain`, a graph must already exist (`graphify-out/graph.json`). Use `/graphify <path> --update` to create one.

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
- If the pack is already installed, the command reports it and suggests `/sync-pack` for updates instead.
