# ✨ oh-my-kilo ✨

*A curated Kilo Code configuration with specialized agents, skills, rules, and workflows — built to make Kilo smarter and more autonomous out of the box.*

**Kilo Code Agent Suite** · 12 agents · 49 skills · 7 rules

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Agents](https://img.shields.io/badge/agents-12-orange)](#meet-the-agents)
[![Skills](https://img.shields.io/badge/skills-49-green)](#skills)

---

## What is oh-my-kilo?

A **configuration pack** for [Kilo Code](https://github.com/Kilo-Org/kilocode) — plain files you copy into `~/.config/kilo`. No plugin runtime, no build step. Instead of building your AI coding workflow from scratch, you get a curated, opinionated setup that works immediately:

- **12 specialized agents** — implementation, debugging, planning, auditing, UI, security, docs, and more, with a delegation hierarchy already designed
- **49 skills** — battle-tested playbooks (TDD, systematic debugging, code review, writing-plans, web-perf) curated from popular community packs
- **7 global rules** — always-on guardrails: English-only files, mandatory memory search, mandatory skill check, knowledge-graph-first navigation, parallel delegation, Cloudflare Workers doc-first, caveman/ponytail style
- **2 commands** — `/update-pack` and `/install-pack` for syncing and installing the pack

The idea is simple: **prompts in files, models in config, behavior in rules.** Edit an agent prompt by editing its file; switch models via Kilo Settings; add your own agents, rules, or skills without touching anything else.

## Who is it for?

- **Everyone using Kilo Code** — from your first session to daily power use. If you're new to Kilo, install oh-my-kilo and you get a curated setup ready to go; you can learn Kilo while it works for you.
- **Kilo users who want a ready-to-use setup** — install and start, no prompt engineering required
- **Intermediate / power users** who want a more structured workflow — clear delegation patterns, consistent session behavior, and a knowledge graph for large codebases

## What do you get?

| Component | Count | What it does |
|-----------|-------|--------------|
| Agents | 12 | 6 primary (`code`, `debug`, `ask`, `planner`, `auditor`, `designer`) + 6 subagents (`general`, `explore`, `tester`, `security`, `librarian`, `documentarian`) |
| Skills | 49 | Curated playbooks across 9 categories: writing, code-review, planning, agents, config, UI, devops, debugging, testing |
| Rules | 7 | Always-on session guardrails, loaded via the `instructions` config |
| Commands | 2 | `/update-pack` — sync pack files; `/install-pack` — AI-assisted install |

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
rm -rf ~/.config/kilo/agents ~/.config/kilo/skills ~/.config/kilo/rules ~/.config/kilo/command ~/.config/kilo/docs ~/.config/kilo/AGENTS.md
cp -r ~/.config/kilo.backup-YYYYMMDD/* ~/.config/kilo/
```

Don't like it? Restore and you're exactly where you started.

---

## 🚀 Quick Start

Copy the repo contents into your Kilo config dir. No scripts, no merge helpers — plain copy.

> 💡 **AI-assisted alternative:** Once `/install-pack` is available in your Kilo session, you can skip steps 1–4 below and just run `/install-pack` — an agent clones the repo (if needed), backs up your config, copies the pack, registers all rules in `kilo.jsonc`, and verifies the install. Manual steps below remain the canonical install path.

### 1. Clone the repo (recommended path)

```powershell
# Windows (recommended)
git clone https://github.com/PanPanFR/oh-my-kilo.git "$env:USERPROFILE\.config\kilo\oh-my-kilo"
```

```bash
# macOS / Linux (recommended)
git clone https://github.com/PanPanFR/oh-my-kilo.git ~/.config/kilo/oh-my-kilo
```

> **Clone elsewhere?** No problem. The `/install-pack` and `/update-pack` commands detect the repo automatically regardless of clone location. See [Commands](#-commands) for details.

> **First-time setup:** `/install-pack` lives in the repo, not your config yet. Copy commands first, then let the agent handle the rest:
>
> ```powershell
> # pwsh — one-liner
> Copy-Item "$env:USERPROFILE\.config\kilo\oh-my-kilo\command" "$env:USERPROFILE\.config\kilo\command" -Recurse -Force
> ```
> ```bash
> # bash
> cp -r ~/.config/kilo/oh-my-kilo/command ~/.config/kilo/command
> ```
> Start a new session → `/install-pack` → done. Future updates: `/update-pack`.

### 2. Copy into `~/.config/kilo` (no subfolder)

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
| **Minimal** | Agents + skills + rules + commands | Core setup — works with zero extra tools. No graphify? Plain search. No agentmemory? Built-in `kilo_memory_recall`/`kilo_memory_save`. |
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

What does this pack actually *do*? Here are five real prompts — and what happens **without** oh-my-kilo versus **with** it, so the difference is clear.

### 1. Repository Audit

> "Audit this repository's architecture and identify the biggest problems."

**Without oh-my-kilo:** One agent reads through files manually, greps around, and gives a surface-level opinion — architecture, performance, and security all mushed into one pass with no structure.

**With oh-my-kilo:**
- **Agent:** `auditor` → delegates `security`, `explore`, `librarian` in parallel
- **Skills:** `clean-code`, `code-review`, `ponytail-audit`
- **Rules:** graphify-first navigation, parallel delegation
- **Result:** architecture + performance + code-quality report, backed by subagent findings

### 2. Debugging

> "Find the root cause of this bug and propose a fix."

**Without oh-my-kilo:** The agent guesses, tries a fix, breaks something else, tries again — no systematic approach, no memory of similar past bugs.

**With oh-my-kilo:**
- **Agent:** `debug`
- **Skills:** `systematic-debugging`, `diagnosing-bugs`
- **Rules:** memory check first (has this bug been seen before?), skill check
- **Result:** root-cause analysis with evidence, not guesswork; fix only after diagnosis

### 3. New Feature Implementation

> "Add a new feature: [description]."

**Without oh-my-kilo:** The agent starts coding immediately — no plan, no tests, no review. The feature works (maybe), but the architecture drifts and nothing is verified.

**With oh-my-kilo:**
- **Agent:** `code` → spawns `planner` for the design, `tester` for tests, `security` when auth/data is involved
- **Skills:** `writing-plans`, `test-driven-development`, `verification-before-completion`
- **Rules:** plan-file protocol for complex tasks, TDD before implementation, verify before claiming done
- **Result:** structured `plan/Implementation-*.md`, tests written first, evidence-backed completion

### 4. Architecture Review

> "Review this application's architecture and suggest improvements."

**Without oh-my-kilo:** A loose opinion piece — "maybe extract this, perhaps that service is too big" — with no verification against the actual code.

**With oh-my-kilo:**
- **Agent:** `planner` → delegates `explore`, `librarian`
- **Skills:** `codebase-design`, `domain-modeling`, `improve-codebase-architecture`
- **Rules:** plan-file protocol, user confirmation loop before implementation
- **Result:** structured review with evidence from the codebase, explicit trade-offs, and a plan you confirm before anything is implemented

### 5. Knowledge Graph Exploration

> "Explore this codebase and map the relationships between its major components."

**Without oh-my-kilo:** Manual `grep` + reading file after file — slow, and you miss the cross-file structure.

**With oh-my-kilo:**
- **Agent:** `code` (or any agent)
- **Entry point:** `/graphify` (skill — from the slash menu)
- **Skills:** `graphify`
- **Rules:** graphify-first navigation (init graph if missing)
- **Result:** structural map of the codebase — queries, paths, explanations — before touching code

---

## 🏛 Meet the Agents

Twelve curated agents. Each agent is a markdown file in `agents/` — edit the prompt by editing the file. Model, variant, and permissions are configured via Kilo Settings.

> 📖 **Full agent guide with model recommendations:** [docs/AGENTS.md](docs/AGENTS.md)

### Primary Agents 🔷

| # | Agent | Role | Prompt |
|---|-------|------|--------|
| 01 | **`code`** — The Architect | Implementation, debugging, general dev; delegates to specialists | [`agents/code.md`](agents/code.md) |
| 02 | **`debug`** — The Root-Cause Hunter | Reproduce → isolate → bisect; no guessing | [`agents/debug.md`](agents/debug.md) |
| 03 | **`ask`** — The Sage | Read-only Q&A; never touches a file | [`agents/ask.md`](agents/ask.md) |
| 04 | **`planner`** — The Oracle | Architecture decisions, trade-offs, implementation plans | [`agents/planner.md`](agents/planner.md) |
| 05 | **`auditor`** — The Inspector | Repo audit — architecture + performance + code quality, parallel delegation | [`agents/auditor.md`](agents/auditor.md) |
| 06 | **`designer`** — The Artisan | UI/UX implementation, frontend polish, WCAG 2.2 AA | [`agents/designer.md`](agents/designer.md) |

### Subagents 🔶

| # | Agent | Role | Prompt |
|---|-------|------|--------|
| 07 | **`general`** — The All-Rounder | Multi-step research, decomposition, per-step verification | [`agents/general.md`](agents/general.md) |
| 08 | **`explore`** — The Pathfinder | Fast codebase scouting — broad, shallow, quick | [`agents/explore.md`](agents/explore.md) |
| 09 | **`tester`** — The Prover | Comprehensive test suites — unit tests, edge cases, error paths | [`agents/tester.md`](agents/tester.md) |
| 10 | **`security`** — The Guardian | OWASP Top 10, auth flaws, injection, secrets, deps | [`agents/security.md`](agents/security.md) |
| 11 | **`librarian`** — The Archivist | Official docs, specs, reference implementations — cited | [`agents/librarian.md`](agents/librarian.md) |
| 12 | **`documentarian`** — The Scribe | README, API docs, runbooks — verified against code | [`agents/documentarian.md`](agents/documentarian.md) |

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

Seven global rules. **Rules are NOT auto-loaded from the `rules/` folder** — each file must be registered in your `kilo.jsonc` under `instructions`, or added via Settings → Agent Behaviour → Rules → Add Additional Instruction Files → select the file → Add.

| Rule | Applies | Mandate |
|------|---------|---------|
| `language` | always | All file content in English; Indonesian chat-only, never in files |
| `agentmemory` | always | Mandatory memory search before any task; mandatory saves at defined points |
| `skill-reminder` | always | Mandatory skill check + load before any implementation task |
| `graphify` | always | Use the knowledge graph for codebase questions; init if missing |
| `delegation` | always | Delegate specialized work to subagents; run independent subtasks in parallel |
| `workers` | on Cloudflare files | Prefer current Cloudflare docs over training data |
| `communication-style` | always | Caveman (terse) replies and Ponytail (minimal) code style in every session |

Reference: [docs/RULES.md](docs/RULES.md)

## ⌨️ Commands

| Command | Description |
|---------|-------------|
| `/update-pack [path]` | Update pack files (`agents/`, `command/`, `rules/`, `skills/`, `AGENTS.md`) in `~/.config/kilo` and register all rules in `kilo.jsonc` `instructions` |
| `/install-pack [path]` | AI-assisted install — clone if missing, back up config, copy pack folders, register rules, set `skills.paths` |

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
- Rules are **not** auto-loaded from the `rules/` folder — each must be registered in `kilo.jsonc` `instructions` or via Settings → Agent Behaviour → Rules → Add Additional Instruction Files (see [docs/INSTALL.md](docs/INSTALL.md#4-register-rules-in-kilojsonc))
- Graph workflows (`graphify` skill/rule) require `graphify` installed (`npm i -g graphify`)
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
| [docs/COMMANDS.md](docs/COMMANDS.md) | Commands usage and examples |
| [docs/CONFIGURATION.md](docs/CONFIGURATION.md) | `kilo.jsonc` blocks: permissions, providers, MCPs, agents, indexing |

## 🙏 Credits

oh-my-kilo is **heavily inspired by [oh-my-opencode-slim](https://github.com/alvinunreal/oh-my-opencode-slim)** by [alvinunreal](https://github.com/alvinunreal) — a lean, curated multi-agent suite for OpenCode. The idea of an opinionated, ready-to-use agent configuration pack (specialized agents + delegation hierarchy + skills + rules) comes from that project; oh-my-kilo adapts the concept for Kilo Code with its own agents, skills, and workflows. Check it out if you use OpenCode too.

## 🔒 Security

The pack ships zero credentials — only credential-free MCPs, `{env:VAR}` placeholders, and an opinionated permission default that you should review. See [SECURITY.md](SECURITY.md).

## Contributing

Found a bug, an install issue, or have an agent/skill suggestion? Open an issue or PR — see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE).
