# Meet the Agents

oh-my-kilo ships 12 curated agents — 6 primary + 6 subagents. Each agent is a markdown file in the `agents/` directory with a system prompt and frontmatter.

**Mode legend:** `all` = usable as your main session agent (primary). `subagent` = invoked by a primary agent via the Task tool for focused work.

## Agent Configuration

**System prompts are editable ONLY through `agents/*.md` files.** Model, variant, and temperature for each agent are configured by the user via Kilo settings (`kilo settings` or the extension UI), which writes the `agent` block in the user's `kilo.jsonc` — keep those out of the agent frontmatter. Restrictive `permission:` blocks in the frontmatter ARE honored at runtime: `security`, `tester`, and `documentarian` ship deny-first scopes (read-only / test files only / docs only), and `planner` ships explicit full access.

---

## 01. Code — The Architect

> *The one who translates intent into working software.*

The default agent. It triages every task, writes the code, and coordinates specialists when the work crosses boundaries. If you only use one agent, this is it.

| | |
|---|---|
| **Role** | Default agent — implementation, debugging, general development, delegates to subagents |
| **Mode** | `all` 🔷 |
| **Prompt** | `agents/code.md` |
| **Model guidance** | Your strongest all-rounder. Plans, edits code, and coordinates specialists — needs reliable instruction-following and broad judgment over raw speed. |
| **Recommended models** | Claude Opus, GPT-5.6-Terra, DeepSeek-V4-Pro |

---

## 02. Debug — The Root-Cause Hunter

> *Does not guess. Does not hope. Finds the truth in the stack trace.*

When you're stuck on a bug, Debug takes over — reproduce → isolate → bisect, one falsifiable hypothesis at a time. No guessing, no shotgun debugging.

| | |
|---|---|
| **Role** | Systematic troubleshooting, root cause analysis, diagnostics |
| **Mode** | `all` 🔷 |
| **Prompt** | `agents/debug.md` |
| **Model guidance** | High-reasoning model. Debugging rewards careful chain-of-thought and patience over speed. |
| **Recommended models** | Claude Opus, GPT-5.6-Sol, DeepSeek-V4-Pro |

---

## 03. Ask — The Sage

> *Reads, explains, teaches. Never touches a file.*

Read-only Q&A. Safe default for casual questions, code explanations, and concept exploration. Nothing is changed — just understanding.

| | |
|---|---|
| **Role** | Read-only Q&A — explain code, explore concepts, investigate without changing anything |
| **Mode** | `all` 🔷 |
| **Prompt** | `agents/ask.md` |
| **Model guidance** | Any capable model; a fast/cheap lane is fine since answers are read-only. |
| **Recommended models** | DeepSeek-V4-Flash, GPT-5.6-Luna, Mimo-V2.5 |

---

## 04. Planner — The Oracle

> *Stands at the crossroads of every architectural decision.*

Before big work happens, Planner designs the approach — architecture decisions, trade-offs, and structured implementation plans with measurable definitions of done.

| | |
|---|---|
| **Role** | System design, architecture planning, implementation plans |
| **Mode** | `all` 🔷 |
| **Prompt** | `agents/planner.md` |
| **Model guidance** | Strongest planning and judgment model. Reasons about trade-offs and writes plan documents — depth beats throughput. |
| **Recommended models** | Claude Opus, GPT-5.6-Terra, DeepSeek-V4-Pro |

---

## 05. Auditor — The Inspector

> *Three lenses. One report. No mercy.*

Full repository audit across architecture, performance, and code quality. Delegates security, recon, and research in parallel — then synthesizes into a severity-tiered report.

| | |
|---|---|
| **Role** | Repository auditor — architecture, performance, code quality; delegates security, recon, research in parallel |
| **Mode** | `all` 🔷 |
| **Prompt** | `agents/auditor.md` |
| **Model guidance** | Strong reasoning model — synthesizes three parallel lenses into one coherent report. |
| **Recommended models** | Claude Opus, GPT-5.6-Sol, GLM-5.2 |

---

## 06. Designer — The Artisan

> *Pixels, principles, and accessibility — in that order.*

UI/UX implementation with frontend frameworks, visual polish, and WCAG 2.2 AA compliance. Prefers adapting existing templates over building from scratch.

| | |
|---|---|
| **Role** | UI/UX implementation — frontend, visual polish, accessibility (WCAG 2.2 AA) |
| **Mode** | `all` 🔷 |
| **Prompt** | `agents/designer.md` |
| **Model guidance** | Model strong at UI/UX judgment and frontend implementation; visual reasoning ability is a plus. |
| **Recommended models** | Gemini-3.5-Flash, Kimi-K2.7-Code, Mimo-V2.5 |

---

## 07. General — The All-Rounder

> *Whatever needs doing — decompose, execute, verify.*

General-purpose subagent for complex multi-step research tasks. Decomposes the problem, executes step by step, and verifies each step before moving on.

| | |
|---|---|
| **Role** | General-purpose research and multi-step task execution |
| **Mode** | `subagent` 🔶 |
| **Prompt** | `agents/general.md` |
| **Model guidance** | Mid-tier model with good tool discipline; must follow decomposed steps without drifting. |
| **Recommended models** | Claude Sonnet, DeepSeek-V4-Pro, GPT-5.6-Luna |

---

## 08. Explore — The Pathfinder

> *Fast in, fast out. Maps the terrain before anyone else arrives.*

Quick codebase exploration — scouting, pattern finding, file location. Broad but shallow: speed and efficiency matter more than peak reasoning.

| | |
|---|---|
| **Role** | Fast codebase exploration — scouting, pattern finding, file location |
| **Mode** | `subagent` 🔶 |
| **Prompt** | `agents/explore.md` |
| **Model guidance** | Fast, low-cost model. Scouting is broad but shallow — speed and efficiency matter more than peak reasoning. |
| **Recommended models** | DeepSeek-V4-Flash, GPT-5.3-Codex, Mimo-V2.5 |

---

## 09. Tester — The Prover

> *If it's not tested, it's not done.*

Writes comprehensive test suites — unit tests, edge cases, error paths. Follows the project's existing test patterns and framework idioms.

| | |
|---|---|
| **Role** | Generates comprehensive test suites — unit tests, edge cases, error paths |
| **Mode** | `subagent` 🔶 |
| **Prompt** | `agents/tester.md` |
| **Model guidance** | Reliable coding model; must produce executable tests, so correctness of framework idioms matters. |
| **Recommended models** | Claude Sonnet, DeepSeek-V4-Pro, Kimi-K2.7-Code |

---

## 10. Security — The Guardian

> *Finds what you didn't know was broken — before someone else does.*

OWASP Top 10, auth flaws, injection, secrets exposure, dependency vulnerabilities. Read-only audit with findings tagged by severity + CWE/CVE + remediation.

| | |
|---|---|
| **Role** | Security audits — OWASP Top 10, auth flaws, injection, secrets exposure, dependency vulnerabilities |
| **Mode** | `subagent` 🔶 |
| **Prompt** | `agents/security.md` |
| **Model guidance** | Strong, careful model; security review rewards thoroughness and current vulnerability knowledge. |
| **Recommended models** | Claude Opus, GPT-5.6-Sol, DeepSeek-V4-Pro |

---

## 11. Librarian — The Archivist

> *Every claim cited. Every source verified.*

External knowledge lookup — official docs, specs, GitHub implementations. Cheap research lane that keeps your main context lean.

| | |
|---|---|
| **Role** | External knowledge — official docs, specs, GitHub implementations; every claim cited |
| **Mode** | `subagent` 🔶 |
| **Prompt** | `agents/librarian.md` |
| **Model guidance** | Fast, low-cost model. Research is retrieval-heavy; citations matter more than deep reasoning. |
| **Recommended models** | Mimo-V2.5, DeepSeek-V4-Flash, GPT-5.3-Codex |

---

## 12. Documentarian — The Scribe

> *Writes the words that let others understand what you built.*

Technical documentation — READMEs, API docs, architecture docs, runbooks. Every claim verified against code with file:line references.

| | |
|---|---|
| **Role** | Technical documentation — README, API docs, architecture docs, runbooks, setup guides |
| **Mode** | `subagent` 🔶 |
| **Prompt** | `agents/documentarian.md` |
| **Model guidance** | Mid-tier model with strong writing; must verify claims against code with file:line references. |
| **Recommended models** | Claude Sonnet, GPT-5.6-Luna, DeepSeek-V4-Pro |

---

## When to Use Each Agent

| Task | Agent | Why |
|------|-------|-----|
| Implementing a feature | `code` | Triage → delegate → implement |
| Fixing a bug you can't figure out | `debug` | Reproduce → isolate → bisect |
| Understanding code without changing it | `ask` | Read-only, safe, cheap |
| Before big architectural work | `planner` | Design → plan → confirm → hand off to code |
| Full repo audit | `auditor` | Three lenses in parallel, one report |
| UI/UX work | `designer` | Frontend implementation + accessibility |
| Complex multi-step research | `general` | Decompose → execute → verify per step |
| Exploring an unknown codebase | `explore` | Fast, broad, shallow — the scout |
| Writing comprehensive tests | `tester` | Unit tests, edge cases, error paths |
| Security audit or vulnerability scan | `security` | OWASP, auth, injection, secrets, deps |
| Looking up official docs or specs | `librarian` | Cheap research, cited, keeps context lean |
| Writing README, API docs, or runbooks | `documentarian` | Verified against code, file:line references |
| UI/UX design and accessibility | `designer` | Visual implementation, WCAG 2.2 AA |
