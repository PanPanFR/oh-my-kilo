# Rules

Seven global rules. **Not auto-loaded from the `rules/` folder** — each must be registered in the `instructions` key in `kilo.jsonc` (or via Settings → Agent Behaviour → Rules → Add Additional Instruction Files):

```jsonc
"instructions": [
  "rules/language.md",
  "rules/agentmemory.md",
  "rules/skill-reminder.md",
  "rules/graphify.md",
  "rules/delegation.md",
  "rules/workers.md",
  "rules/communication-style.md"
]
```

---

## 01. Language — The Wall

> *Every file in English. Every conversation in whatever you speak.*

| | |
|---|---|
| **File** | `rules/language.md` |
| **Always applies** | ✅ every session |
| **Problem** | Agents generate code, docs, and commit messages in whatever language the user happens to write in. Mixed-language codebases are a maintenance nightmare. |
| **What it changes** | All file content — plan files, docs, README, code, comments, test names, commit messages, generated markdown — is forced to English. Indonesian (or any other language) is chat-only, never file content. |
| **Trade-off** | User must speak English in file-oriented prompts (or accept that the rule overrides their language). Only exception: explicitly asking for another language in a specific file. |

---

## 02. Agent Memory — The Long Memory

> *Every task starts with a search. Every session ends with a save.*

| | |
|---|---|
| **File** | `rules/agentmemory.md` |
| **Always applies** | ✅ every task |
| **Problem** | Agents forget everything between sessions. The same bugs get re-diagnosed, the same patterns get re-discovered, the same decisions get re-debated. |
| **What it changes** | Every task starts with `memory_smart_search` — if prior context exists, it's incorporated. Save points are mandatory: non-trivial decisions, bug patterns, error fixes, session recaps, project switches. Fallback: Kilo's built-in `kilo_memory_recall` / `kilo_memory_save` when `agentmemory` MCP is unavailable. |
| **Trade-off** | Small overhead at task start (one search call). Saves hours over a multi-session project. |

---

## 03. Skill Reminder — The Checklist

> *Before coding, check if a playbook already exists.*

| | |
|---|---|
| **File** | `rules/skill-reminder.md` |
| **Always applies** | ✅ every implementation task |
| **Problem** | Agents jump straight to coding without checking if there's a better way. TDD, systematic debugging, code review — all skipped because the agent didn't know the skill existed. |
| **What it changes** | Before any implementation task: identify task type → match against skill map → load skill → follow instructions → then implement. The skill map covers docs, tests, UI, review, git, performance, and more. |
| **Trade-off** | A few extra tokens at the start of each task to check the skill map. Prevents skipped best practices and lower-quality output. |

---

## 04. Graphify — The Map

> *Navigate with a graph, not with grep.*

| | |
|---|---|
| **File** | `rules/graphify.md` |
| **Always applies** | ✅ every codebase task |
| **Problem** | Agents browse source files blindly — slow, misses cross-file relationships, and wastes context on irrelevant code. |
| **What it changes** | Uses `graphify query`, `path`, and `explain` before manual source browsing. If no graph exists, init with `graphify update .` (AST-only, no API cost). After code changes, update the graph. If a task could benefit from graphify but the user hasn't activated it, the agent proactively tells the user about `/graphify`. |
| **Trade-off** | Requires `graphify` installed (`npm i -g graphify`). Without it, falls back to plain search — no breakage, just slower navigation. |

---

## 05. Delegation — The Hierarchy

> *Don't do everything yourself. Know when to hand off.*

| | |
|---|---|
| **File** | `rules/delegation.md` |
| **Always applies** | ✅ any task that fits a subagent |
| **Problem** | One agent doing everything is slow, context-bloated, and bad at specialist work. Security reviews by a general-purpose agent miss OWASP patterns; test suites miss edge cases. |
| **What it changes** | Mandates delegating to specialized subagents (`security`, `tester`, `librarian`, `documentarian`, `explore`) and running independent subtasks **in parallel** in a single message. |
| **Trade-off** | Subagent invocation adds a few seconds of overhead per delegation. But parallel delegation is faster overall than sequential single-agent work, and specialist quality is higher. |

---

## 06. Workers — The Doc-First Shield

> *Don't trust training data for Cloudflare. Read the docs first.*

| | |
|---|---|
| **File** | `rules/workers.md` |
| **Applies to** | `.ts`, `.tsx`, `.js`, wrangler files only (scoped) |
| **Problem** | LLM training data for Cloudflare Workers, KV, R2, D1, Durable Objects, and Wrangler is outdated. Agents hallucinate old APIs, deprecated flags, and wrong config patterns. |
| **What it changes** | Before any Cloudflare-related work, the agent retrieves current documentation. Includes specific doc links, `npx wrangler` commands, and page limits. |
| **Trade-off** | Adds a doc fetch step when touching Cloudflare files. But prevents deploying code with deprecated or wrong API calls — which is far more expensive to fix. |

---

## 07. Communication Style — The Voice

> *Terse replies, minimal code. Every session, every agent.*

| | |
|---|---|
| **File** | `rules/communication-style.md` |
| **Always applies** | ✅ every session, every reply |
| **Problem** | Agents drift into verbose filler, over-built code, and status phrases that waste tokens and readability. |
| **What it changes** | Mandates Caveman-style compressed replies (~65% fewer output tokens) and Ponytail-style minimal code (YAGNI, stdlib-first, shortest working diff) in every response. Replaces the duplicate style blocks previously copied into each `agents/*.md`. |
| **Trade-off** | Ultra-terse replies can feel abrupt; the rule explicitly relaxes to normal prose for security warnings, irreversible actions, and multi-step sequences where clarity matters. |
