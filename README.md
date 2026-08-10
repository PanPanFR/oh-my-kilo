# ✨ oh-my-kilo ✨

*A curated Kilo Code configuration with specialized agents, skills, rules, and workflows — built to make Kilo smarter and more autonomous out of the box.*

**Kilo Code Agent Suite** · 12 agents · 49 skills · 6 rules · `/graphify`

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Agents](https://img.shields.io/badge/agents-12-orange)](#meet-the-agents)
[![Skills](https://img.shields.io/badge/skills-49-green)](#skills)

---

## What is oh-my-kilo?

A **configuration pack** for [Kilo Code](https://github.com/Kilo-Org/kilocode) — plain files you copy into `~/.config/kilo`. No plugin runtime, no build step. Instead of building your AI coding workflow from scratch, you get a curated, opinionated setup that works immediately:

- **12 specialized agents** — implementation, debugging, planning, auditing, UI, security, docs, and more, with a delegation hierarchy already designed
- **49 skills** — battle-tested playbooks (TDD, systematic debugging, code review, writing-plans, web-perf) curated from popular community packs
- **6 global rules** — always-on guardrails: English-only files, mandatory memory search, mandatory skill check, knowledge-graph-first navigation, parallel delegation, Cloudflare Workers doc-first
- **1 command** — `/graphify` for building and querying codebase knowledge graphs

The idea is simple: **prompts in files, models in config, behavior in rules.** Edit an agent prompt by editing its file; switch models via Kilo Settings; add your own agents, rules, or skills without touching anything else.

## Who is it for?

- **Kilo users who want a ready-to-use setup** — install and start, no prompt engineering required
- **Intermediate / power users** who want a more structured workflow — clear delegation patterns, consistent session behavior, and a knowledge graph for large codebases
- **Not** aimed at people who have never used Kilo — you should know the basics first

## What do you get?

| Component | Count | What it does |
|-----------|-------|--------------|
| Agents | 12 | 6 primary (`code`, `debug`, `ask`, `planner`, `auditor`, `designer`) + 6 subagents (`general`, `explore`, `tester`, `security`, `librarian`, `documentarian`) |
| Skills | 49 | Curated playbooks across 9 categories: writing, code-review, planning, agents, config, UI, devops, debugging, testing |
| Rules | 6 | Always-on session guardrails, loaded via the `instructions` config |
| Commands | 1 | `/graphify` — build/query codebase knowledge graphs |

---

## ⚠️ Before You Install: Backup Your Config

oh-my-kilo copies files **into your existing Kilo config directory** (`~/.config/kilo`). If you already have agents, skills, rules, or an `AGENTS.md` there, they will be **overwritten or merged**.

**Always back up your current config first:**

```bash
# Windows (PowerShell)
Copy-Item "$env:USERPROFILE\.config\kilo" "$env:USERPROFILE\.config\kilo.backup-$(Get-Date -Format yyyyMMdd)" -Recurse

# macOS / Linux
cp -r ~/.config/kilo ~/.config/kilo.backup-$(date +%Y%m%d)
```

**To roll back:** delete the oh-my-kilo files from `~/.config/kilo` and restore your backup:

```bash
# macOS / Linux
rm -rf ~/.config/kilo/agents ~/.config/kilo/skills ~/.config/kilo/rules ~/.config/kilo/commands ~/.config/kilo/docs ~/.config/kilo/AGENTS.md
cp -r ~/.config/kilo.backup-YYYYMMDD/* ~/.config/kilo/
```

Don't like it? Restore and you're exactly where you started.

---

## 🚀 Quick Start

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

## 🎚 Setup Tiers

Not everything is mandatory. Pick the tier that matches what you need:

| Tier | Includes | Best for |
|------|----------|----------|
| **Minimal** | Agents + skills + rules + `/graphify` command | Core setup — works with zero extra tools. No graphify? Plain search. No agentmemory? Built-in `kilo_memory_recall`/`kilo_memory_save`. |
| **Recommended** | Minimal + MCP servers (`context7`, `chrome-devtools`, `playwright`) | Most users. Up-to-date docs lookup, browser control, automation — needs a free [context7](https://context7.com) API key. |
| **Full** | Recommended + `graphify` + `agentmemory` | Power users. Knowledge graph for large codebases + persistent cross-session memory. |

### Minimal — start here

Follow [Quick Start](#-quick-start). That's it. The pack degrades gracefully when optional tools are missing.

### Recommended — add MCP servers

Add the MCP block to your `kilo.jsonc`:

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

Set `CTX7_API_KEY` in your `.env` or shell. `{env:VAR}` placeholders resolve **only in the trusted global config** (`~/.config/kilo/`).

### Full — add knowledge graph + persistent memory

```bash
npm i -g graphify
```

```jsonc
"mcp": {
  "agentmemory": {
    "type": "local",
    "command": ["npx", "-y", "@agentmemory/mcp"],
    "environment": { "AGENTMEMORY_URL": "http://localhost:3111" }
  }
}
```

Full MCP reference, including optional servers and credential-bearing ones: [docs/CONFIGURATION.md](docs/CONFIGURATION.md#mcp--register-servers-in-kilo-jsonc).

---

## 🎯 Example Workflows

What does this pack actually *do*? Here are five real prompts and how the pack routes them.

### 1. Repository Audit

> "Audit this repository's architecture and identify the biggest problems."

- **Agent:** `auditor` → delegates `security`, `explore`, `librarian` in parallel
- **Skills:** `clean-code`, `code-review`, `ponytail-audit`
- **Rules:** graphify-first navigation, parallel delegation
- **Result:** architecture + performance + code-quality report, backed by subagent findings

### 2. Debugging

> "Find the root cause of this bug and propose a fix."

- **Agent:** `debug`
- **Skills:** `systematic-debugging`, `diagnosing-bugs`
- **Rules:** memory check first (has this bug been seen before?), skill check
- **Result:** root-cause analysis with evidence, not guesswork; fix only after diagnosis

### 3. Documentation

> "Analyze this project and improve its documentation."

- **Agent:** `documentarian`
- **Skills:** `documentation`, `writing-skills`
- **Rules:** English-only files
- **Result:** README/API docs/runbooks written or refreshed, in-repo structure respected

### 4. Architecture Review

> "Review this application's architecture and suggest improvements."

- **Agent:** `planner` → delegates `explore`, `librarian`
- **Skills:** `codebase-design`, `domain-modeling`, `improve-codebase-architecture`
- **Rules:** plan-file protocol, user confirmation loop before implementation
- **Result:** structured `plan/Implementation-*.md` with steps, quality gates, and risks

### 5. Knowledge Graph Exploration

> "Explore this codebase and map the relationships between its major components."

- **Agent:** `code` (or any agent)
- **Command:** `/graphify`
- **Skills:** `graphify`
- **Rules:** graphify-first navigation (init graph if missing)
- **Result:** structural map of the codebase — queries, paths, explanations — before touching code

---

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

## ⌨️ Commands

| Command | Description |
|---------|-------------|
| `/graphify [args]` | Build or query a graphify knowledge graph — `query`, `path`, `explain`, `update` |

Reference: [docs/COMMANDS.md](docs/COMMANDS.md)

---

## 🖥 Compatibility

| Platform / Tool | Status |
|-----------------|--------|
| Kilo Code (CLI) | ✅ Tested |
| Kilo Code (VS Code extension) | ✅ Tested |
| Windows | ✅ Tested |
| Linux | ✅ Tested |
| macOS | ⚠️ Untested (should work — same paths as Linux; report issues) |
| `graphify` | Optional — degrades to plain search if missing |
| `agentmemory` | Optional — falls back to built-in Kilo memory if missing |
| MCP servers | Optional — see [Setup Tiers](#-setup-tiers) |

## ⚠️ Known Limitations

- Some skills require `skills.paths` configuration — without it, Kilo looks in the default `%USERPROFILE%\.kilo\skills\` directory
- Graph workflows (`/graphify`, `graphify` rule) require `graphify` installed (`npm i -g graphify`)
- Persistent cross-session memory requires the `agentmemory` MCP server running on `localhost:3111`
- Some MCPs require authentication (e.g. `context7` needs a free API key)
- Some MCPs may require first-run setup (e.g. `npx playwright install chromium`)

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

## Contributing

Found a bug, an install issue, or have an agent/skill suggestion? Open an issue or PR — see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE).
