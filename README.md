# ✨ oh-my-kilo ✨

*A curated Kilo Code configuration with specialized agents, skills, rules, and workflows — built to make Kilo smarter and more autonomous out of the box.*

**Kilo Code Agent Suite** · 10 agents · 24 skills · 7 rules

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Agents](https://img.shields.io/badge/agents-10-orange)](#meet-the-agents)
[![Skills](https://img.shields.io/badge/skills-24-green)](#skills)

---

## What is oh-my-kilo?

A **configuration pack** for [Kilo Code](https://github.com/Kilo-Org/kilocode) — plain files you copy into `~/.config/kilo`. No plugin runtime, no build step. Works identically on **both the Kilo Code CLI and the Kilo Code VS Code extension** — one pack, both surfaces. Instead of building your AI coding workflow from scratch, you get a curated, opinionated setup that works immediately:

- **10 specialized agents** — 4 primary (implementation, debugging, planning, Q&A) + 6 subagents (implementation executor, researcher, tester, reviewer, docs writer, codebase recon) with a delegation hierarchy already designed
- **24 skills** — battle-tested playbooks (TDD, systematic debugging, code review, writing-plans, web-perf) curated from popular community packs and trimmed to what earns its place in every session
- **7 global rules** — always-on guardrails: English-only files, mandatory memory search, mandatory skill check, knowledge-graph-first navigation, parallel delegation, Cloudflare Workers doc-first, caveman/ponytail style
- **1 command** — `/update-pack` to pull latest changes and sync the pack into your config

The idea is simple: **prompts in files, models in config, behavior in rules.** Edit an agent prompt by editing its file; switch models via Kilo Settings; add your own agents, rules, or skills without touching anything else.

## Who is it for?

- **Everyone using Kilo Code** — from your first session to daily power use. If you're new to Kilo, install oh-my-kilo and you get a curated setup ready to go; you can learn Kilo while it works for you.
- **Kilo users who want a ready-to-use setup** — install and start, no prompt engineering required
- **Intermediate / power users** who want a more structured workflow — clear delegation patterns, consistent session behavior, and a knowledge graph for large codebases

## What do you get?

| Component | Count | What it does |
|-----------|-------|--------------|
| Agents | 10 | 4 primary (`code`, `debug`, `ask`, `plan`) + 6 subagents (`general`, `researcher`, `tester`, `reviewer`, `docs`, `explore`) — built-in Kilo agents with enriched prompts |
| Skills | 24 | Curated playbooks across 8 categories: core, planning, over-engineering audits, communication, workflow/git, UI, platform, meta |
| Rules | 7 | Always-on session guardrails, loaded via the `instructions` config |
| Commands | 1 | `/update-pack` — pull + sync pack files + register rules |

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

### 1. Clone the repo (recommended path)

```powershell
# Windows (recommended)
git clone https://github.com/PanPanFR/oh-my-kilo.git "$env:USERPROFILE\.config\kilo\oh-my-kilo"
```

```bash
# macOS / Linux (recommended)
git clone https://github.com/PanPanFR/oh-my-kilo.git ~/.config/kilo/oh-my-kilo
```

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

### 5. Updating the pack

When a new version is available, just type `/update-pack` — the agent pulls the latest changes from GitHub and syncs everything automatically.

> Full details, uninstall, and troubleshooting: [docs/INSTALL.md](docs/INSTALL.md)

## ✅ Verify Your Setup

In a Kilo session, ask:

```
list your agents and confirm which skills are loaded
```

You should see all 10 agents and the 24 skills. If something is missing, check the skills path and rules from [docs/INSTALL.md](docs/INSTALL.md#troubleshooting).

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
- **Agent:** `code` (audit mode) → delegates `reviewer`, `explore` in parallel
- **Skills:** `clean-code`, `code-review`, `ponytail-audit`
- **Rules:** graphify-first navigation, parallel delegation
- **Result:** architecture + performance + code-quality report, backed by subagent findings

### 2. Debugging

> "Find the root cause of this bug and propose a fix."

**Without oh-my-kilo:** The agent guesses, tries a fix, breaks something else, tries again — no systematic approach, no memory of similar past bugs.

**With oh-my-kilo:**
- **Agent:** `debug`
- **Skills:** `systematic-debugging`
- **Rules:** memory check first (has this bug been seen before?), skill check
- **Result:** root-cause analysis with evidence, not guesswork; fix only after diagnosis

### 3. New Feature Implementation

> "Add a new feature: [description]."

**Without oh-my-kilo:** The agent starts coding immediately — no plan, no tests, no review. The feature works (maybe), but the architecture drifts and nothing is verified.

**With oh-my-kilo:**
- **Agent:** `code` → spawns `plan` for the design, `tester` for tests, `reviewer` for security analysis when auth/data is involved
- **Skills:** `writing-plans`, `test-driven-development`, `verification-before-completion`
- **Rules:** plan-file protocol for complex tasks, TDD before implementation, verify before claiming done
- **Result:** structured `plan/Implementation-*.md`, tests written first, evidence-backed completion

### 4. Architecture Review

> "Review this application's architecture and suggest improvements."

**Without oh-my-kilo:** A loose opinion piece — "maybe extract this, perhaps that service is too big" — with no verification against the actual code.

**With oh-my-kilo:**
- **Agent:** `plan` → delegates `explore`, `researcher`
- **Skills:** `codebase-design`, `writing-plans`
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

Ten curated agents built on Kilo's built-in roster — each one is a markdown file in `agents/` that enriches a native agent with specialist protocols. Edit the prompt by editing the file. Model, variant, and permissions are configured via Kilo Settings.

> 📖 **Full agent guide with model recommendations:** [docs/AGENTS.md](docs/AGENTS.md)

### Primary Agents 🔷

| # | Agent | Role | Prompt |
|---|-------|------|--------|
| 01 | **`code`** — The Architect | Implementation, debugging, general dev; audit lenses (architecture/performance/quality) + UI/accessibility protocols; delegates to specialists | [`agents/code.md`](agents/code.md) |
| 02 | **`debug`** — The Root-Cause Hunter | Reproduce → isolate → bisect; no guessing | [`agents/debug.md`](agents/debug.md) |
| 03 | **`ask`** — The Sage | Read-only Q&A; never touches a file | [`agents/ask.md`](agents/ask.md) |
| 04 | **`plan`** — The Oracle | Architecture decisions, trade-offs, implementation plans (writes to `.kilo/plans/` only) | [`agents/plan.md`](agents/plan.md) |

### Subagents 🔶

| # | Agent | Role | Prompt |
|---|-------|------|--------|
| 05 | **`general`** — The Executor | UI/frontend builds, refactors, multi-step execution of well-defined tasks | [`agents/general.md`](agents/general.md) |
| 06 | **`researcher`** — The Librarian | External research with cited findings (perplexity MCP + Context7); keeps noisy fetch output out of main context | [`agents/researcher.md`](agents/researcher.md) |
| 07 | **`tester`** — The Gatekeeper | Writes and runs test suites, iterates failures in isolation, reports compact results | [`agents/tester.md`](agents/tester.md) |
| 08 | **`reviewer`** — The Inspector | Diff review vs repo standards, spec, and security baseline — read-only, findings only | [`agents/reviewer.md`](agents/reviewer.md) |
| 09 | **`docs`** — The Scribe | Creates and improves documentation in `docs/`, verified against code | [`agents/docs.md`](agents/docs.md) |
| 10 | **`explore`** — The Pathfinder | Fast codebase scouting — broad, shallow, quick | [`agents/explore.md`](agents/explore.md) |

## 🧩 Skills

Skills are prompt-based playbooks injected into an agent's context when a task matches. They run no process — just focused instructions. The 24 skills are **curated from popular community skill packs** (obra/superpowers, mattpocock/skills, vercel-labs/skills, and others), selected and grouped by category — you get the best-known workflows (TDD, systematic debugging, code review, writing-plans, UI design, web-perf) without installing each pack yourself. Loaded automatically at session start via the `skills.paths` config, and the `skill-reminder` rule makes every task check for a matching skill before starting.

| Category | Skills | Purpose |
|----------|--------|---------|
| core | `clean-code`, `code-review`, `documentation`, `git-commit`, `systematic-debugging`, `test-driven-development`, `verification-before-completion` | Daily development: quality, review, docs, commits, debugging, TDD, verification |
| planning | `codebase-design`, `executing-plans`, `grilling`, `writing-plans` | Design, plan creation and execution, stress-testing decisions |
| over-engineering audits | `ponytail-audit`, `ponytail-review` | YAGNI audits at repo and diff level |
| communication & config | `caveman`, `graphify`, `ponytail` | Terse mode, knowledge graphs, minimal coding |
| workflow & git | `handoff`, `resolving-merge-conflicts` | Session handoffs, merge/rebase conflicts |
| UI & performance | `pwa-development`, `ui-design`, `vercel-react`, `web-perf` | Frontend, PWA, performance |
| platform | `cloudflare` | Unified Cloudflare platform skill |
| meta | `writing-skills` | Creating and verifying skills themselves |

Full 24-skill table with descriptions: [docs/SKILLS.md](docs/SKILLS.md)

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
| `/update-pack [path]` | Pull latest changes from GitHub and sync pack files + register rules in `kilo.jsonc` |

Reference: [docs/COMMANDS.md](docs/COMMANDS.md)

---

## 🖥 Compatibility

oh-my-kilo works on **both Kilo Code surfaces** — the CLI and the VS Code extension read the same `~/.config/kilo` config, so agents, skills, and rules behave the same in either one.

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
| [docs/AGENTS.md](docs/AGENTS.md) | The 10 agents — config model, when to use each, model recommendations |
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
