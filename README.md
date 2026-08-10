# ✨ oh-my-kilo ✨

*A curated Kilo Code configuration pack — twelve specialized agents, forty-nine skills, six global rules, and a knowledge-graph command, ready to install and use.*

**Kilo Code Agent Suite** · 12 agents · 49 skills · 6 rules · `/graphify`

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Agents](https://img.shields.io/badge/agents-12-orange)](#meet-the-agents)
[![Skills](https://img.shields.io/badge/skills-49-green)](#skills)

✦ ✦ ✦

## What's This

oh-my-kilo is a **configuration pack** for [Kilo Code](https://github.com/Kilo-Org/kilocode) — plain files you copy into `~/.config/kilo`. No plugin runtime, no installer script. What you get:

- **A curated set of agent prompts** — 12 markdown files in `agents/` that shape how Kilo's agents behave. Five (`code`, `debug`, `ask`, `planner`, `auditor`) run as your main session agent; the other seven are specialists you delegate to via the Task tool.
- **49 skills** — prompt-based playbooks curated from popular community skill packs (obra/superpowers, mattpocock/skills, vercel-labs/skills, and others), organized by category so the right workflow is one skill-load away.
- **6 global rules** — always-on guardrails that keep every session consistent: English-only files, mandatory memory search, mandatory skill check, knowledge-graph-first navigation, delegation policy, and Cloudflare Workers doc-first guidance.
- **1 command** — `/graphify`, wired to the graphify skill for building and querying codebase knowledge graphs.

The idea is simple: **prompts in files, models in config, behavior in rules.** Edit an agent prompt by editing its file; switch models via Kilo Settings; add your own agents, rules, or skills without touching anything else.

### ✨ Highlights

- **12 specialized agents** — 6 primary (`code`, `debug`, `ask`, `planner`, `auditor`, `designer`) + 6 subagents (`general`, `explore`, `tester`, `security`, `librarian`, `documentarian`). Primary agents run as your main session agent and delegate; subagents are invoked by them for focused work. — [Meet the Agents](#meet-the-agents)
- **49 bundled skills** — curated from popular community packs (obra/superpowers, mattpocock/skills, vercel-labs/skills, and others), covering writing, code review, planning, agents, config, UI, devops, debugging, and testing. Auto-loaded by the `skill-reminder` rule. — [Skills](#skills)
- **6 global rules** — language enforcement, mandatory memory check, mandatory skill check, graphify navigation, delegation policy, Cloudflare Workers guidance. — [Rules](#rules)
- **`/graphify` command** — build and query a knowledge graph of any codebase, wired to the `graphify` skill. — [Commands](#commands)
- **MCP support** — required `agentmemory` server plus recommended `context7`, `chrome-devtools`, `playwright`, all registered in your `kilo.jsonc`. — [MCP Servers](#mcp-servers)
- **Fully editable** — every agent prompt is a plain markdown file in `agents/`; customize, add, or remove freely.

<a id="prerequisites"></a>
## Prerequisites

Two extra tools power parts of the pack. Install them both in one go:

| Tool | What it does | Install |
|------|--------------|---------|
| **graphify** | Builds and queries the codebase knowledge graph (`graphify-out/`) used by the `graphify` rule, the `graphify` skill, and `/graphify` | `npm i -g graphify` |
| **agentmemory** | Persistent cross-session memory server on `localhost:3111`; powers the `agentmemory` rule and is a **required MCP server** (register it in `kilo.jsonc`, see [MCP Servers](#mcp-servers)) | `npx -y @agentmemory/mcp` with `AGENTMEMORY_URL=http://localhost:3111` |

If a tool is missing, the pack degrades gracefully: no graphify → plain search instead of graph queries; no agentmemory → the rules fall back to Kilo's built-in `kilo_memory_recall` / `kilo_memory_save`.

<a id="mcp-servers"></a>
## 🧩 MCP Servers

MCP servers extend Kilo with external tools (docs lookups, browser automation, memory). **They are configured in your `kilo.jsonc` under the `"mcp"` block** — the servers themselves run as `npx` processes on demand, so there is nothing to install beyond the `mcp` block below.

### Required

| MCP | Why | Type |
|-----|-----|------|
| `agentmemory` | Persistent cross-session memory — required by the `agentmemory` rule. Add it after running the [Prerequisites](#prerequisites) install. | local |

```jsonc
"mcp": {
  "agentmemory": {
    "type": "local",
    "command": ["npx", "-y", "@agentmemory/mcp"],
    "environment": { "AGENTMEMORY_URL": "http://localhost:3111" }
  }
}
```

### Highly Recommended

| MCP | Why | Type |
|-----|-----|------|
| `context7` | Up-to-date library documentation for any package — the pack's agents use it for research. Needs a free API key from [context7.com](https://context7.com) | remote |
| `chrome-devtools` | Live browser control: page snapshots, console, network, performance traces, Lighthouse audits | local |
| `playwright` | Browser automation for testing and web scraping (first run may need `npx playwright install chromium`) | local |

```jsonc
"mcp": {
  "context7": {
    "type": "remote",
    "url": "https://mcp.context7.com/mcp",
    "headers": { "Authorization": "{env:CTX7_API_KEY}" }
  },
  "chrome-devtools": {
    "type": "local",
    "command": ["npx", "-y", "chrome-devtools-mcp@latest"]
  },
  "playwright": {
    "type": "local",
    "command": ["npx", "-y", "@playwright/mcp@latest"]
  }
}
```

Set `CTX7_API_KEY` in your `.env` or shell. `{env:VAR}` placeholders resolve **only in the trusted global config** (`~/.config/kilo/`). Full MCP reference, including optional servers and credential-bearing ones: [docs/CONFIGURATION.md](docs/CONFIGURATION.md#mcp--register-servers-in-kilo-jsonc).

## Quick Start

Copy the repo contents into your Kilo config dir. No scripts, no merge helpers — plain copy.

### 1. Clone somewhere outside your Kilo config dir

```powershell
# Windows
git clone https://github.com/PanPanFR/oh-my-kilo.git "$env:USERPROFILE\oh-my-kilo"
```

```bash
# macOS / Linux
git clone https://github.com/PanPanFR/oh-my-kilo.git ~/oh-my-kilo
```

### 2. Copy into `~/.config/kilo` (no subfolder)

```powershell
# Windows
Copy-Item -Path "$env:USERPROFILE\oh-my-kilo\agents" -Destination "$env:USERPROFILE\.config\kilo" -Recurse -Force
Copy-Item -Path "$env:USERPROFILE\oh-my-kilo\commands" -Destination "$env:USERPROFILE\.config\kilo" -Recurse -Force
Copy-Item -Path "$env:USERPROFILE\oh-my-kilo\docs" -Destination "$env:USERPROFILE\.config\kilo" -Recurse -Force
Copy-Item -Path "$env:USERPROFILE\oh-my-kilo\rules" -Destination "$env:USERPROFILE\.config\kilo" -Recurse -Force
Copy-Item -Path "$env:USERPROFILE\oh-my-kilo\skills" -Destination "$env:USERPROFILE\.config\kilo" -Recurse -Force
Copy-Item "$env:USERPROFILE\oh-my-kilo\AGENTS.md" "$env:USERPROFILE\.config\kilo\AGENTS.md" -Force
```

```bash
# macOS / Linux
rsync -a ~/oh-my-kilo/agents/ ~/.config/kilo/agents/
rsync -a ~/oh-my-kilo/commands/ ~/.config/kilo/commands/
rsync -a ~/oh-my-kilo/docs/ ~/.config/kilo/docs/
rsync -a ~/oh-my-kilo/rules/ ~/.config/kilo/rules/
rsync -a ~/oh-my-kilo/skills/ ~/.config/kilo/skills/
cp ~/oh-my-kilo/AGENTS.md ~/.config/kilo/AGENTS.md
```

### 3. Configure the skills path

Add to your `kilo.jsonc`:

```jsonc
"skills": {
  "paths": [
    "C:\\Users\\<YourUser>\\.config\\kilo\\skills"
  ]
}
```

Or via **Kilo Settings UI**: Settings → Agent Behaviour → Skills → scroll to bottom → add `C:\Users\<YourUser>\.config\kilo\skills` (replace `<YourUser>`).

Without this, Kilo looks in `%USERPROFILE%\.kilo\skills\` by default — you'd need to copy skills there manually.

### 4. Restart

Start a new Kilo session or run `/reload`.

> Full details, uninstall, and troubleshooting: [docs/INSTALL.md](docs/INSTALL.md)

## ✅ Verify Your Setup

In a Kilo session, ask:

```
list your agents and confirm which skills are loaded
```

You should see all 12 agents and the 49 skills. If something is missing, check the skills path and rules from [docs/INSTALL.md](docs/INSTALL.md#troubleshooting).

---

<a id="meet-the-agents"></a>
## 🏛 Meet the Agents

Twelve curated agents. **The `agents/` folder holds prompts only** — each agent is a markdown file containing its system prompt, and that's the single place to edit behavior. Model, variant, and permissions are **not** in these files; configure them per agent via Kilo Settings (which writes the `agent` block in your `kilo.jsonc`).

**Mode legend:** `all` = usable as your main session agent (primary). `subagent` = invoked by a primary agent via the Task tool for focused work.

| Agent | Mode | Role |
|-------|------|------|
| [`code`](agents/code.md) | `all` 🔷 | Default agent — implementation, debugging, general development, delegates to subagents |
| [`debug`](agents/debug.md) | `all` 🔷 | Systematic troubleshooting, root cause analysis, diagnostics |
| [`ask`](agents/ask.md) | `all` 🔷 | Read-only Q&A — explain code, explore concepts, investigate without changing anything |
| [`planner`](agents/planner.md) | `all` 🔷 | System design, architecture planning, implementation plans |
| [`auditor`](agents/auditor.md) | `all` 🔷 | Repository auditor — architecture, performance, code quality; delegates in parallel |
| [`designer`](agents/designer.md) | `all` 🔷 | UI/UX implementation — frontend, visual polish, accessibility |
| [`general`](agents/general.md) | `subagent` 🔶 | General-purpose research and multi-step task execution |
| [`explore`](agents/explore.md) | `subagent` 🔶 | Fast codebase exploration — scouting, pattern finding, file location |
| [`tester`](agents/tester.md) | `subagent` 🔶 | Comprehensive test suites — unit tests, edge cases, error paths |
| [`security`](agents/security.md) | `subagent` 🔶 | Security audits — OWASP Top 10, auth flaws, injection, secrets, dependencies |
| [`librarian`](agents/librarian.md) | `subagent` 🔶 | External knowledge — official docs, specs, GitHub implementations |
| [`documentarian`](agents/documentarian.md) | `subagent` 🔶 | Technical documentation — README, API docs, runbooks, setup guides |

> 📖 **Full agent guide** — when to use each agent, which model profile fits, and concrete model recommendations: [docs/AGENTS.md](docs/AGENTS.md#when-to-use-each-agent)

<a id="skills"></a>
## 🧩 Skills

Skills are prompt-based playbooks injected into an agent's context when a task matches. They run no process — just focused instructions. The 49 skills are **curated from popular community skill packs** (obra/superpowers, mattpocock/skills, vercel-labs/skills, and others), selected and grouped by category — you get the best-known workflows (TDD, systematic debugging, code review, writing-plans, UI design, web-perf) without installing each pack yourself. Loaded automatically at session start via the `skills.paths` config, and the `skill-reminder` rule makes every task check for a matching skill before starting.

| Category | Skills | Purpose |
|----------|--------|---------|
| writing | `documentation`, `teach`, `writing-beats`, `writing-fragments`, `writing-for-agents`, `writing-skills` | Technical docs, teaching, structured writing workflows |
| code-review | `caveman-review`, `clean-code`, `code-review`, `migrate-to-shoehorn`, `ponytail-audit`, `ponytail-review`, `receiving-code-review`, `requesting-code-review` | Clean code, review culture, over-engineering audits |
| planning | `codebase-design`, `domain-modeling`, `executing-plans`, `grilling`, `improve-codebase-architecture`, `to-questionnaire`, `to-spec`, `to-tickets`, `triage`, `wayfinder`, `writing-plans` | Design, specs, tickets, plan execution |
| agents | `agent-md-refactor`, `cavecrew`, `handoff`, `subagent-driven-development` | Agent workflow, delegation, handoffs |
| config | `caveman`, `caveman-compress`, `graphify`, `ponytail` | Communication modes, knowledge graphs, lazy coding |
| UI | `artifacts-builder`, `prototype`, `pwa-development`, `ui-design`, `vercel-react`, `web-perf` | Frontend, PWA, performance |
| devops | `cloudflare`, `finishing-a-development-branch`, `git-commit`, `resolving-merge-conflicts`, `using-git-worktrees`, `verification-before-completion`, `wizard` | Git, deployment, verification |
| debugging | `diagnosing-bugs`, `systematic-debugging` | Diagnosis loops before fixes |
| testing | `test-driven-development` | Tests before implementation |

Full 49-skill table with descriptions: [docs/SKILLS.md](docs/SKILLS.md)

> 💡 **Frontend tip:** For UI/frontend work, prefer starting from an existing template or component library (Tailwind UI, shadcn/ui, your project's boilerplate) and adapting it to your taste — rather than building from scratch. Templates ship with consistent design tokens, responsive behavior, and accessibility defaults already handled; build-from-scratch only when no template fits.

<a id="rules"></a>
## ⚙️ Rules

Six global rules, loaded at session start via the `instructions` config. Each mandates a behavior for every session.

| Rule | Applies | Mandate |
|------|---------|---------|
| `language` | always | All file content in English; Indonesian chat-only, never in files |
| `agentmemory` | always | Mandatory memory search before any task; mandatory saves at defined points |
| `skill-reminder` | always | Mandatory skill check + load before any implementation task |
| `graphify` | always | Use the knowledge graph for codebase questions; init if missing |
| `delegation` | always | Delegate specialized work to subagents; run independent subtasks in parallel |
| `workers` | on Cloudflare files | Prefer current Cloudflare docs over training data |

Reference: [docs/RULES.md](docs/RULES.md)

<a id="commands"></a>
## ⌨️ Commands

| Command | Description |
|---------|-------------|
| `/graphify [args]` | Build or query a graphify knowledge graph — `query`, `path`, `explain`, `update` |

Reference: [docs/COMMANDS.md](docs/COMMANDS.md)

---

## 📚 Documentation

| Doc | What it covers |
|-----|----------------|
| [docs/INSTALL.md](docs/INSTALL.md) | Step-by-step install, uninstall, troubleshooting |
| [docs/STRUCTURE.md](docs/STRUCTURE.md) | What's in the repo — every folder and file explained |
| [docs/AGENTS.md](docs/AGENTS.md) | The 12 agents — config model, when to use each, model recommendations |
| [docs/SKILLS.md](docs/SKILLS.md) | How skills work, how to enable them, full skill table |
| [docs/RULES.md](docs/RULES.md) | The 6 global rules in detail |
| [docs/COMMANDS.md](docs/COMMANDS.md) | `/graphify` usage and examples |
| [docs/CONFIGURATION.md](docs/CONFIGURATION.md) | `kilo.jsonc` blocks: permissions, providers, MCPs, agents, indexing |

## 🔒 Security

The pack ships zero credentials — only credential-free MCPs, `{env:VAR}` placeholders, and an opinionated permission default that you should review. See [SECURITY.md](SECURITY.md).

## License

MIT — see [LICENSE](LICENSE).
