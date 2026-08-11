# Installation

Copy-paste install — no scripts, no merge helpers.

## Steps

### 0. Install prerequisite tools (optional but recommended)

Two extra tools power parts of the pack:

| Tool | Why | Install |
|------|-----|---------|
| **graphify** | Builds/queries the knowledge graph used by the `graphify` rule, the `graphify` skill, and `/graphify` | `npm i -g graphify` |
| **agentmemory** | Persistent cross-session memory server; the `agentmemory` rule and its MCP expect it on `localhost:3111` | run `npx @agentmemory/mcp` with `AGENTMEMORY_URL=http://localhost:3111` |

Without them the pack still works (plain search instead of graph queries; built-in `kilo_memory_recall`/`kilo_memory_save` instead of agentmemory). See [docs/CONFIGURATION.md](CONFIGURATION.md) for the `agentmemory` MCP block.

### 1. Clone the repo (recommended path)

```powershell
# Windows (recommended)
git clone https://github.com/PanPanFR/oh-my-kilo.git "$env:USERPROFILE\.config\kilo\oh-my-kilo"
```

```bash
# macOS / Linux (recommended)
git clone https://github.com/PanPanFR/oh-my-kilo.git ~/.config/kilo/oh-my-kilo
```

> **Clone elsewhere?** No problem. The `/install-pack` and `/update` commands detect the repo automatically regardless of clone location.

### 2. Copy the repo contents directly into your Kilo config dir

No `oh-my-kilo` subfolder — the files land straight in `~/.config/kilo`.

```powershell
# Windows
Copy-Item -Path "$env:USERPROFILE\.config\kilo\oh-my-kilo\agents" -Destination "$env:USERPROFILE\.config\kilo" -Recurse -Force
Copy-Item -Path "$env:USERPROFILE\.config\kilo\oh-my-kilo\command" -Destination "$env:USERPROFILE\.config\kilo" -Recurse -Force
Copy-Item -Path "$env:USERPROFILE\.config\kilo\oh-my-kilo\docs" -Destination "$env:USERPROFILE\.config\kilo" -Recurse -Force
Copy-Item -Path "$env:USERPROFILE\.config\kilo\oh-my-kilo\rules" -Destination "$env:USERPROFILE\.config\kilo" -Recurse -Force
Copy-Item -Path "$env:USERPROFILE\.config\kilo\oh-my-kilo\skills" -Destination "$env:USERPROFILE\.config\kilo" -Recurse -Force
Copy-Item "$env:USERPROFILE\.config\kilo\oh-my-kilo\AGENTS.md" "$env:USERPROFILE\.config\kilo\AGENTS.md" -Force
```

```bash
# macOS / Linux
rsync -a ~/.config/kilo/oh-my-kilo/agents/ ~/.config/kilo/agents/
rsync -a ~/.config/kilo/oh-my-kilo/command/ ~/.config/kilo/command/
rsync -a ~/.config/kilo/oh-my-kilo/docs/ ~/.config/kilo/docs/
rsync -a ~/.config/kilo/oh-my-kilo/rules/ ~/.config/kilo/rules/
rsync -a ~/.config/kilo/oh-my-kilo/skills/ ~/.config/kilo/skills/
cp ~/.config/kilo/oh-my-kilo/AGENTS.md ~/.config/kilo/AGENTS.md
```

### 3. Configure skills path

Add to your `kilo.jsonc`:

```jsonc
"skills": {
  "paths": [
    "C:\\Users\\<YourUser>\\.config\\kilo\\skills"
  ]
}
```

Or via **Kilo Settings UI**: Settings → Agent Behaviour → Skills → scroll to bottom → add skill folder path `C:\Users\<YourUser>\.config\kilo\skills`.

### 4. Register rules in `kilo.jsonc`

Rules are **not** auto-loaded from the `rules/` folder. Register each rule file under `instructions` in your `kilo.jsonc`:

```jsonc
"instructions": [
  "rules/skill-reminder.md",
  "rules/delegation.md",
  "rules/workers.md",
  "rules/agentmemory.md",
  "rules/graphify.md",
  "rules/language.md",
  "rules/communication-style.md"
]
```

Or via **Kilo Settings UI**: Settings → Agent Behaviour → Rules → Add Additional Instruction Files → select each file in `C:\Users\<YourUser>\.config\kilo\rules` → Add.

### 5. Restart

Start a new Kilo session or run `/reload`.

## Uninstall

Remove the copied folders and `AGENTS.md` from your Kilo config dir.

## Troubleshooting

### Skills not loading

Verify `skills.paths` in your `kilo.jsonc` points to the copied `skills/` directory.

### Rules not loading

Rules are not loaded by folder presence — each must be registered in the `instructions` array of your `kilo.jsonc` (or via Settings → Agent Behaviour → Rules → Add Additional Instruction Files). See [Step 4](#4-register-rules-in-kilojsonc).