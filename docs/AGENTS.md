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

## Protocols

Built-in systems that agents follow to keep work structured, traceable, and high-quality. These are not just guidelines — they are enforced workflows embedded in the agent prompts.

### Project Artifacts Protocol — `planner`

Before planning any task, `planner` checks what project documentation already exists:

1. **Scan** `docs/` and repo root for: PRD, TDD (Technical Design Document), API Spec, UI/UX Specs, ADR (Architecture Decision Record — numbered: `ADR-001-<name>.md`, `ADR-002-<name>.md`, ...)
2. **If missing** — asks the user first, then auto-generates them under `docs/` (using the `documentarian` subagent). ADR format: Context → Decision → Consequences.
3. **If exists** — reads them first and bases the plan on them.
4. **After any change** — updates the relevant artifacts so they stay in sync. Never lets docs drift.

### Plan File Protocol — `planner`

Every complex task produces a structured plan file in `plan/Implementation-<name>.md`:

- **Goal & Scope** — problem being solved, target end state, in/out of scope
- **Steps** — ordered by dependency; each states what to do, files to touch, and measurable acceptance criteria (Given/When/Then preferred)
- **Quality gates** — every step's done criteria is verifiable: code compiles, tests pass, lint/types clean. No "looks done."
- **Final verification** — a closing step that checks the work against the plan/spec and confirms every step's done criteria are met.
- **Risks** (only if real) — what could block the plan and mitigation

Plans are living documents — updated when requirements change. Deleted once fully implemented (plans are temporary working documents).

### User Confirmation Loop — `planner`

A plan is not final until the user confirms it. After writing the plan file, `planner` presents a concise summary and asks for confirmation. If the user flags anything wrong, the plan is revised and confirmed again. Never starts implementing while the plan is still unconfirmed.

### Handoff to Code Mode — `planner`

`planner` designs and plans only — it does not implement. Once the user confirms the plan, it instructs them to switch to `code` mode. The `code` agent then implements step-by-step, mirroring plan steps into the Kilo todo list (`todowrite`/`todoread`).

### Task Triage — `code`

Before implementing, `code` classifies the task:

| Complexity | Action |
|-----------|--------|
| **Simple/trivial** (1-2 edits, known fix) | Do it directly. No delegation. |
| **Complex/multi-step** (new feature, refactor, unclear design) | Spawn `planner` first → get plan → implement following plan |
| **Tests** | Spawn `tester` |
| **Security review** | Spawn `security` |
| **UI/frontend** | Spawn `designer` (except trivial one-off tweaks) |
| **Research** | Spawn `librarian` |
| **Codebase recon** | Spawn `explore` |

### Execution Discipline — `code`

When implementing, `code` follows these rules:

- **Plan adherence** — follow `plan/Implementation-*.md` step-by-step; mirror steps into Kilo todo list
- **TDD** — write tests first, confirm they fail, then implement
- **Verification before completion** — never claim done without evidence (run tests/build/lint and report output)
- **Checkpoint defensively** — commit before multi-file refactors so you can roll back
- **Context management** — after 2+ failed corrections, start fresh instead of accumulating degraded context
- **Self-review** — review your own diff before finishing; treat agent output as untrusted

### UI/Frontend Rule — `code`

- Design assets live in a dedicated `design/` folder at the project root
- Before any UI work: check `design/` first; if it exists, read `design/design.md` and follow it
- If `design/` doesn't exist: create it when starting UI work
- If `design/design.md` is missing: ask the user to create one, or generate from project conventions
- Delegation threshold: moderate+ complexity → delegate to `designer`; trivial → do directly

### Docs Folder Protocol — `documentarian`

- All documentation lives in `docs/` at the repo root (create if missing)
- Nested folders for structure: `docs/api/`, `docs/guides/`, `docs/architecture/`
- One file per topic, descriptive names: `docs/api/authentication.md`
- Root-level files like README stay where they are

### Test Folder Protocol — `tester`

- All test files live in `test/` at the repo root (create if missing)
- Nested folders to mirror source: `test/unit/`, `test/integration/`, `test/api/`
- One test file per module/feature, named after what it tests: `test/auth.test.ts`
- Before writing: identify the test framework used and check existing test files for patterns

### Capability Handoff — `code`, `debug`, `ask`, `auditor`

When a task exceeds an agent's capability or another agent is more reliable, the agent says so explicitly and recommends the better agent. Escalates early and concretely — names the agent, says why it fits, and what to ask it.

| Stuck on | Escalate to |
|----------|-------------|
| Bug after 2-3 fix attempts | `debug` |
| UI/visual work | `designer` |
| Security review needed | `security` |
| Test suite needed | `tester` |
| External research needed | `librarian` |
| Architecture/design decision | `planner` |
| Full repo audit | `auditor` |
| Read-only Q&A | `ask` |

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
