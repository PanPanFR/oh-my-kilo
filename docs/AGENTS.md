# Agents

oh-my-kilo ships 12 curated agents. Each agent is a markdown file in the `agents/` directory with a system prompt and frontmatter.

**Mode legend:** `all` = usable as your main session agent (primary). `subagent` = invoked by a primary agent via the Task tool for focused work.

## Agent Configuration

**System prompts are editable ONLY through `agents/*.md` files.** Model, variant, and temperature for each agent are configured by the user via Kilo settings (`kilo settings` or the extension UI), which writes the `agent` block in the user's `kilo.jsonc` — keep those out of the agent frontmatter. Restrictive `permission:` blocks in the frontmatter ARE honored at runtime: `security`, `tester`, and `documentarian` ship deny-first scopes (read-only / test files only / docs only), and `planner` ships explicit full access.

## Agent Table

| Agent | File | Mode | Role |
|-------|------|------|------|
| `code` | `agents/code.md` | `all` | Default agent — implementation, debugging, general development, delegates to subagents |
| `debug` | `agents/debug.md` | `all` | Systematic troubleshooting, root cause analysis, diagnostics |
| `ask` | `agents/ask.md` | `all` | Read-only Q&A — explain code, explore concepts, investigate without changing anything |
| `planner` | `agents/planner.md` | `all` | System design, architecture planning, implementation plans |
| `auditor` | `agents/auditor.md` | `all` | Repository auditor — architecture, performance, code quality. Delegates security, recon, research in parallel |
| `designer` | `agents/designer.md` | `all` | UI/UX implementation — frontend, visual polish, accessibility |
| `general` | `agents/general.md` | `subagent` | General-purpose agent for researching complex questions and executing multi-step tasks |
| `explore` | `agents/explore.md` | `subagent` | Fast codebase exploration — scouting, pattern finding, file location |
| `tester` | `agents/tester.md` | `subagent` | Generates comprehensive test suites — unit tests, edge cases, error paths |
| `security` | `agents/security.md` | `subagent` | Security audits — OWASP Top 10, auth flaws, injection, secrets exposure, dependency vulnerabilities |
| `librarian` | `agents/librarian.md` | `subagent` | External knowledge — docs, specs, GitHub implementations |
| `documentarian` | `agents/documentarian.md` | `subagent` | Technical documentation — README, API docs, architecture docs, runbooks, setup guides |

## When to Use Each Agent

- **`code`** — your primary agent for implementing features, fixing bugs, and general development. It triages the task, then delegates to the right specialist.
- **`debug`** — when you're stuck on a bug. Reproduce → isolate → bisect, one falsifiable hypothesis at a time.
- **`ask`** — when you only want to understand code or explore concepts, no changes.
- **`planner`** — before big work. Architecture decisions, trade-offs, structured implementation plans.
- **`auditor`** — full repository audit across architecture, performance, and code quality, delegating security/recon/research in parallel.
- **`general`** — complex multi-step research tasks that need decomposition and per-step verification.
- **`explore`** — quickly map an unknown codebase or find where something lives.
- **`tester`** — comprehensive test suites with edge cases and error paths.
- **`security`** — security audits, vulnerability scanning, dependency checks.
- **`librarian`** — official docs, specs, and reference implementations, with citations.
- **`documentarian`** — READMEs, API docs, architecture docs, runbooks.
- **`designer`** — UI/UX implementation, component states, accessibility.

---

## Agent Deep Dive

For each agent: what it does, when to call it, and which model profile to assign via Kilo Settings. Model names are provider-agnostic — pick the same family from whichever OpenAI-compatible endpoint you configured.

### `code` — The Implementer

- **Role:** Default agent — implementation, debugging, general development; delegates to subagents.
- **Mode:** `all` (primary)
- **When to use:** your primary agent for implementing features, fixing bugs, and general development work. It triages the task, then delegates to the right specialist.
- **Model guidance:** your strongest all-rounder. It plans, edits code, and coordinates specialists, so it needs reliable instruction-following and broad judgment over raw speed.
- **Recommended:** Claude Opus, GPT-5.6-Terra, DeepSeek-V4-Pro

### `debug` — The Root-Cause Hunter

- **Role:** Systematic troubleshooting, root cause analysis, diagnostics.
- **Mode:** `all` (primary)
- **When to use:** when you're stuck on a bug and need disciplined diagnosis — reproduce → isolate → bisect, one falsifiable hypothesis at a time.
- **Model guidance:** high-reasoning model. Debugging rewards careful chain-of-thought and patience over speed.
- **Recommended:** Claude Opus, GPT-5.6-Sol, DeepSeek-V4-Pro

### `ask` — The Explainer

- **Role:** Read-only Q&A — explain code, explore concepts, investigate without changing anything.
- **Mode:** `all` (primary)
- **When to use:** when you only want to understand code or explore concepts, no changes. Safe default for casual questions.
- **Model guidance:** any capable model; a fast/cheap lane is fine since answers are read-only.
- **Recommended:** DeepSeek-V4-Flash, GPT-5.6-Luna, Mimo-V2.5

### `planner` — The Architect

- **Role:** System design, architecture planning, implementation plans.
- **Mode:** `all` (primary)
- **When to use:** before big work — architecture decisions, trade-offs, structured implementation plans with measurable definitions of done.
- **Model guidance:** strongest planning and judgment model. It reasons about trade-offs and writes plan documents, so depth beats throughput.
- **Recommended:** Claude Opus, GPT-5.6-Terra, DeepSeek-V4-Pro

### `auditor` — The Inspector

- **Role:** Repository auditor — architecture, performance, code quality; delegates security, recon, research in parallel.
- **Mode:** `all` (primary)
- **When to use:** full repository audit across architecture, performance, and code quality when you want a severity-tiered report.
- **Model guidance:** strong reasoning model — it synthesizes three parallel lenses into one report.
- **Recommended:** Claude Opus, GPT-5.6-Sol, GLM-5.2

### `general` — The All-Rounder

- **Role:** General-purpose research and multi-step task execution.
- **Mode:** `subagent`
- **When to use:** complex multi-step research tasks that need decomposition and per-step verification.
- **Model guidance:** mid-tier model with good tool discipline; it must follow decomposed steps without drifting.
- **Recommended:** Claude Sonnet, DeepSeek-V4-Pro, GPT-5.6-Luna

### `explore` — The Scout

- **Role:** Fast codebase exploration — scouting, pattern finding, file location.
- **Mode:** `subagent`
- **When to use:** quickly map an unknown codebase or find where something lives, before deeper work.
- **Model guidance:** fast, low-cost model. Scouting is broad but shallow — speed and efficiency matter more than peak reasoning.
- **Recommended:** DeepSeek-V4-Flash, GPT-5.3-Codex, Mimo-V2.5

### `tester` — The Verifier

- **Role:** Generates comprehensive test suites — unit tests, edge cases, error paths.
- **Mode:** `subagent`
- **When to use:** when you need comprehensive test suites written, following the project's existing test patterns.
- **Model guidance:** reliable coding model; it must produce executable tests, so correctness of the framework idioms matters.
- **Recommended:** Claude Sonnet, DeepSeek-V4-Pro, Kimi-K2.7-Code

### `security` — The Guardian

- **Role:** Security audits — OWASP Top 10, auth flaws, injection, secrets exposure, dependency vulnerabilities.
- **Mode:** `subagent`
- **When to use:** security audits, vulnerability scanning, dependency checks — read-only, findings with severity + CWE/CVE + remediation.
- **Model guidance:** strong, careful model; security review rewards thoroughness and current vulnerability knowledge.
- **Recommended:** Claude Opus, GPT-5.6-Sol, DeepSeek-V4-Pro

### `librarian` — The Researcher

- **Role:** External knowledge — official docs, specs, GitHub implementations; every claim cited.
- **Mode:** `subagent`
- **When to use:** looking up official docs, specs, and reference implementations — cheap research lane that keeps your context lean.
- **Model guidance:** fast, low-cost model. Research is retrieval-heavy; citations matter more than deep reasoning.
- **Recommended:** Mimo-V2.5, DeepSeek-V4-Flash, GPT-5.3-Codex

### `documentarian` — The Scribe

- **Role:** Technical documentation — README, API docs, architecture docs, runbooks, setup guides.
- **Mode:** `subagent`
- **When to use:** when you need READMEs, API docs, architecture docs, or runbooks written and verified against code.
- **Model guidance:** mid-tier model with strong writing; must verify claims against code with file:line references.
- **Recommended:** Claude Sonnet, GPT-5.6-Luna, DeepSeek-V4-Pro

### `designer` — The Aesthetician

- **Role:** UI/UX implementation — frontend, visual polish, accessibility (WCAG 2.2 AA).
- **Mode:** `all` (primary)
- **When to use:** UI/UX implementation, component design, and accessibility work.
- **Frontend tip:** prefer adapting an existing template or component library (Tailwind UI, shadcn/ui, project boilerplate) over building from scratch — faster, more consistent, and accessibility defaults come for free. Build-from-scratch only when no template fits.
- **Model guidance:** model strong at UI/UX judgment and frontend implementation; visual reasoning ability is a plus.
- **Recommended:** Gemini-3.5-Flash, Kimi-K2.7-Code, Mimo-V2.5
