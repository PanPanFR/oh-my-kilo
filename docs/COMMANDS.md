# Commands Reference

oh-my-kilo ships one slash command: `/graphify`.

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
