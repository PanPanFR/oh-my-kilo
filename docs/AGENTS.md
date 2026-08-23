# Meet the Agents

oh-my-kilo ships 10 curated agents — 4 primary + 6 subagents — built on Kilo's built-in agent roster. Each agent is a markdown file in the `agents/` directory with a system prompt and frontmatter that enriches the native agent with specialist protocols.

**Mode legend:** `all` = usable as your main session agent (primary). `subagent` = invoked by a primary agent via the Task tool for focused work.

## Agent Configuration

**System prompts are editable ONLY through `agents/*.md` files.** Model, variant, and temperature for each agent are configured by the user via Kilo settings (`kilo settings` or the extension UI), which writes the `agent` block in the user's `kilo.jsonc` — keep those out of the agent frontmatter. Restrictive `permission:` blocks in the frontmatter ARE honored at runtime: `plan` ships deny-first scopes (plan-file writes in `.kilo/plans/` only, read-only bash), and `ask` is read-only by design.

---

## 01. Code — The Architect

> *The one who translates intent into working software.*

The default agent. It triages every task, writes the code, and coordinates specialists when the work crosses boundaries. Carries the audit lenses (architecture / performance / quality) and UI/accessibility protocols inline, so review and frontend discipline happen without leaving the session. If you only use one agent, this is it.

| | |
|---|---|
| **Role** | Default agent — implementation, debugging, general development; audit lenses; UI/accessibility protocols; delegates to subagents |
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

## 04. Plan — The Oracle

> *Stands at the crossroads of every architectural decision.*

Before big work happens, Plan designs the approach — architecture decisions, trade-offs, and structured implementation plans with measurable definitions of done. Restricted by design: writes only to `.kilo/plans/*.md`, read-only bash, everything else asks for approval or hands off to `code`.

| | |
|---|---|
| **Role** | System design, architecture planning, implementation plans |
| **Mode** | `all` 🔷 |
| **Prompt** | `agents/plan.md` |
| **Permissions** | Edit: `.kilo/plans/*` only (`*`: ask) · Bash: read-only commands · MCP: allowed |
| **Model guidance** | Strongest planning and judgment model. Reasons about trade-offs and writes plan documents — depth beats throughput. |
| **Recommended models** | Claude Opus, GPT-5.6-Terra, DeepSeek-V4-Pro |

---

## 05. General — The Executor

> *Decompose, execute, verify — nothing else.*

Implementation executor for well-defined multi-step work: UI/frontend builds, refactors, migrations. Follows plan files under `.kilo/plans/`, verifies each step, and reports at checkpoints. Research, tests, review, and docs work is handed back to the parent to route to specialists.

| | |
|---|---|
| **Role** | UI/frontend builds, refactors, multi-step execution of well-defined tasks |
| **Mode** | `subagent` 🔶 |
| **Prompt** | `agents/general.md` |
| **Model guidance** | Mid-tier model with good tool discipline; must follow decomposed steps without drifting. |
| **Recommended models** | Claude Sonnet, DeepSeek-V4-Pro, GPT-5.6-Luna |

---

## 06. Researcher — The Librarian

> *Reads the internet so your context window doesn't have to.*

External research specialist for library, framework, and API questions. Uses perplexity MCP first, Context7 for library docs, websearch as fallback. Returns an answer-first digest with verbatim signatures, per-claim citations, and explicit limitations — noisy fetch output never reaches the main agent.

| | |
|---|---|
| **Role** | External research - library/framework/API docs with cited findings |
| **Mode** | `subagent` 🔶 |
| **Prompt** | `agents/researcher.md` |
| **Model guidance** | A fast/cheap model works — the value is isolation and citation discipline, not deep reasoning. |
| **Recommended models** | DeepSeek-V4-Flash, GPT-5.6-Luna, Mimo-V2.5 |

---

## 07. Tester — The Gatekeeper

> *Red, green, and no lies in between.*

Test specialist that writes, runs, and fixes test suites in an isolated loop. Test-folder protocol, Arrange/Act/Assert quality gates, edge cases enumerated before assertions, tautological assertions banned. Iterates failures locally (capped at ~5 attempts) so noisy runner output stays out of the main context.

| | |
|---|---|
| **Role** | Test suites - write, run, iterate failures in isolation, report compact results |
| **Mode** | `subagent` 🔶 |
| **Prompt** | `agents/tester.md` |
| **Model guidance** | Reliable mid-tier model; must not weaken tests to make them pass. |
| **Recommended models** | Claude Sonnet, DeepSeek-V4-Pro, GPT-5.6-Luna |

---

## 08. Reviewer — The Inspector

> *Reads everything, changes nothing, reports findings only.*

Diff review specialist covering three axes: repo standards, spec compliance, and a security baseline (OWASP Top 10). Read-only by design — one line per finding with severity, evidence at file:line, and a concrete fix. Fewer verified findings beat noisy lists.

| | |
|---|---|
| **Role** | Code + security review of diffs vs repo standards and spec (read-only) |
| **Mode** | `subagent` 🔶 |
| **Prompt** | `agents/reviewer.md` |
| **Model guidance** | Strong reasoning helps for security analysis; read-heavy workload benefits from a large-context model. |
| **Recommended models** | Claude Sonnet, GPT-5.6-Terra, DeepSeek-V4-Pro |

---

## 09. Docs — The Scribe

> *If it isn't documented against the code, it isn't documented.*

Technical writing specialist with two modes: WRITE new docs (README, runbooks, API docs, Diátaxis structure) and IMPROVE existing docs (audit accuracy vs code, fix structure, deduplicate, repair links — without inventing behavior). Every claim verified against actual code.

| | |
|---|---|
| **Role** | Technical writing - create and improve documentation in `docs/` |
| **Mode** | `subagent` 🔶 |
| **Prompt** | `agents/docs.md` |
| **Model guidance** | Any capable model; strong prose matters more than raw reasoning power. |
| **Recommended models** | DeepSeek-V4-Flash, GPT-5.6-Luna, Mimo-V2.5 |

---

## 10. Explore — The Pathfinder

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

## Protocols

Built-in systems that agents follow to keep work structured, traceable, and high-quality. These are not just guidelines — they are enforced workflows embedded in the agent prompts.

### Project Artifacts Protocol — `plan`

Before planning any task, `plan` checks what project documentation already exists:

1. **Scan** `docs/` and repo root for: PRD, TDD (Technical Design Document), API Spec, UI/UX Specs, ADR (Architecture Decision Record — numbered: `ADR-001-<name>.md`, `ADR-002-<name>.md`, ...)
2. **If missing** — asks the user first, then auto-generates them under `docs/`. ADR format: Context → Decision → Consequences.
3. **If exists** — reads them first and bases the plan on them.
4. **After any change** — updates the relevant artifacts so they stay in sync. Never lets docs drift.

### Plan File Protocol — `plan`

Every complex task produces a structured plan file in `.kilo/plans/Implementation-<name>.md`:

- **Goal & Scope** — problem being solved, target end state, in/out of scope
- **Steps** — ordered by dependency; each states what to do, files to touch, and measurable acceptance criteria (Given/When/Then preferred)
- **Quality gates** — every step's done criteria is verifiable: code compiles, tests pass, lint/types clean. No "looks done."
- **Final verification** — a closing step that checks the work against the plan/spec and confirms every step's done criteria are met.
- **Risks** (only if real) — what could block the plan and mitigation

Plans are living documents — updated when requirements change. Deleted once fully implemented (plans are temporary working documents). The `.kilo/plans/` location matches Kilo's native plan-agent write scope, so plans stay editable without permission prompts.

### User Confirmation Loop — `plan`

A plan is not final until the user confirms it. After writing the plan file, `plan` presents a concise summary and asks for confirmation. If the user flags anything wrong, the plan is revised and confirmed again. Never starts implementing while the plan is still unconfirmed.

### Handoff to Code Mode — `plan`

`plan` designs and plans only — it does not implement. Once the user confirms the plan, it instructs them to switch to `code` mode. The `code` agent then implements step-by-step, mirroring plan steps into the Kilo todo list (`todowrite`/`todoread`).

### Task Triage — `code`

Before implementing, `code` classifies the task:

| Complexity | Action |
|-----------|--------|
| **Simple/trivial** (1-2 edits, known fix) | Do it directly. No delegation. |
| **Complex/multi-step** (new feature, refactor, unclear design) | Spawn `plan` first → get plan → implement following plan |
| **Tests** | Spawn `tester` |
| **Security / diff review** | Spawn `reviewer` |
| **UI/frontend & multi-step implementation** | Spawn `general`; do truly trivial tweaks directly |
| **Research** | Spawn `researcher` |
| **Documentation** | Spawn `docs` |
| **Codebase recon** | Spawn `explore` |

### Execution Discipline — `code`

When implementing, `code` follows these rules:

- **Plan adherence** — follow `.kilo/plans/Implementation-*.md` step-by-step; mirror steps into Kilo todo list
- **TDD** — write tests first, confirm they fail, then implement
- **Verification before completion** — never claim done without evidence (run tests/build/lint and report output)
- **Checkpoint defensively** — commit before multi-file refactors so you can roll back
- **Context management** — after 2+ failed corrections, start fresh instead of accumulating degraded context
- **Self-review** — review your own diff before finishing; treat agent output as untrusted

### Audit Lenses — `code`

When reviewing code, `code` analyzes three lenses in a single pass:

- **Architecture** — structure, modularity, layering, coupling, scalability
- **Performance** — N+1 queries, bundle size, caching, algorithmic complexity
- **Quality** — maintainability, naming, dead code, error handling, duplication

Findings are severity-tiered (Blocker / Warning / Suggestion / Praise), cite file:line with a concrete fix, capped at 5-10 per review.

### UI/Frontend Rule — `code`

- Design assets live in a dedicated `design/` folder at the project root
- Before any UI work: check `design/` first; if it exists, read `design/design.md` and follow it
- If `design/` doesn't exist: create it when starting UI work
- If `design/design.md` is missing: ask the user to create one, or generate from project conventions
- Accessibility floor: WCAG 2.2 AA — keyboard reachability, visible focus indicators, 24x24px targets, AA color contrast
- Component states: default, hover, focus, active, disabled, loading, empty, error

### Docs Folder Protocol — `docs`

- All documentation lives in `docs/` at the repo root (create if missing)
- Nested folders for structure: `docs/api/`, `docs/guides/`, `docs/architecture/`
- One file per topic, descriptive names: `docs/api/authentication.md`
- Every claim verified against actual code with file:line references; never document behavior that doesn't exist
- Improve mode: audit accuracy first, fix structure without inventing behavior

### Test Folder Protocol — `tester`

- All test files live in `test/` at the repo root (create if missing)
- Nested folders to mirror source: `test/unit/`, `test/integration/`, `test/api/`
- One test file per module/feature, named after what it tests: `test/auth.test.ts`
- Before writing: identify the test framework used and check existing test files for patterns
- Quality gates: Arrange/Act/Assert, edge cases enumerated before assertions, no tautological assertions, never mock the function under test

### Security Review Protocol — `reviewer`

- Checklist: input validation (XSS/injection), authn/authz flaws, data exposure, dependency vulnerabilities, config security, OWASP Top 10, race conditions, insecure deserialization
- Method: map attack surface first; exclude node_modules/vendored/generated code from scope; read hunks with surrounding context
- Reporting: every finding carries file:line, severity, evidence, remediation; fewer verified findings beat noisy lists

### Research Method — `researcher`

- Source hierarchy: official docs > published specs > papers > engineering blogs > forums
- Quick vs deep mode matched to question complexity; deep = multi-query decomposition + contradiction analysis
- Perplexity MCP first, Context7 for library docs; every claim cited with URL + source type; stale info flagged `[outdated: ...]`; unconfirmed items reported explicitly

### Capability Handoff — `code`, `debug`, `ask`

When a task exceeds an agent's capability or another agent is more reliable, the agent says so explicitly and recommends the better agent. Escalates early and concretely — names the agent, says why it fits, and what to ask it.

| Stuck on | Escalate to |
|----------|-------------|
| Bug after 2-3 fix attempts | `debug` |
| Architecture/design decision | `plan` |
| External research / docs lookup | `researcher` |
| Test suites | `tester` |
| Security or diff review | `reviewer` |
| Documentation | `docs` |
| UI/implementation workhorse | `general` |
| Codebase recon needed | `explore` |
| Read-only Q&A | `ask` |

---

## When to Use Each Agent

| Task | Agent | Why |
|------|-------|-----|
| Implementing a feature | `code` | Triage → delegate → implement |
| Fixing a bug you can't figure out | `debug` | Reproduce → isolate → bisect |
| Understanding code without changing it | `ask` | Read-only, safe, cheap |
| Before big architectural work | `plan` | Design → plan → confirm → hand off to code |
| Repo/code audit | `code` | Three lenses in one pass, severity-tiered report |
| UI/UX implementation | `code` | Frontend protocols + WCAG 2.2 AA baked into prompt |
| Complex multi-step research | `researcher` | Cited findings without bloating main context |
| Exploring an unknown codebase | `explore` | Fast, broad, shallow — the scout |
| Writing comprehensive tests | `tester` | Test quality gates, isolated iteration loop |
| Security audit or vulnerability scan | `reviewer` | OWASP baseline, verified findings only |
| Looking up official docs or specs | `researcher` | Source hierarchy, cited claims |
| Writing README, API docs, or runbooks | `docs` | Docs folder protocol, verified against code |
| Executing a well-defined plan task | `general` | Decompose → execute → verify per step |
