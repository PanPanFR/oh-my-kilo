# Rules Reference

Six global rules live in `rules/`. They are loaded at session start through the `instructions` key in `kilo.jsonc`, which after install points at each file:

```jsonc
"instructions": [
  "rules/language.md",
  "rules/agentmemory.md",
  "rules/skill-reminder.md",
  "rules/graphify.md",
  "rules/delegation.md",
  "rules/workers.md"
]
```

## Rules

| Rule | File | `alwaysApply` | Triggers on |
|------|------|---------------|-------------|
| Language | `rules/language.md` | ✅ | every session |
| Agent memory | `rules/agentmemory.md` | ✅ | every task |
| Skill reminder | `rules/skill-reminder.md` | ✅ | every implementation task |
| Graphify | `rules/graphify.md` | ✅ | every codebase question |
| Delegation | `rules/delegation.md` | ✅ | any task that fits a subagent |
| Workers | `rules/workers.md` | ❌ | `.ts`/`.js`/wrangler files only |

## language

Mandates that **everything written to files is English** — plan files, docs, README, code, comments, test names, commit messages, generated markdown. Indonesian (or any other language) is chat-only, never file content. Only exception: the user explicitly asks for another language in a specific file.

## agentmemory

Mandates persistent cross-session context:

- **Step 1 of every task**: `memory_smart_search` with keywords from the user's request. If results, incorporate them; if none, proceed.
- **Mandatory save points**: when the user asks about existing code, mentions previous work, after a non-trivial decision, when a bug/pattern is found, when an error is hit, when a task completes, and on project switch (`memory_handoff`).
- Fallback: if the agentmemory MCP is unavailable, Kilo's built-in `kilo_memory_recall` / `kilo_memory_save` are used instead.

## skill-reminder

Mandates a **skill check before any implementation task**: identify the task type, match it against the skill map (docs → `documentation`, tests → `test-driven-development`, UI → `ui-design`, code review → `clean-code`, git → `git-commit`, etc.), load the matching skill, follow its instructions, then implement. Skipping the check is the failure mode this rule prevents.

## graphify

Mandates knowledge-graph-first codebase navigation:

- If `graphify-out/graph.json` exists, run `graphify query` / `graphify path` / `graphify explain` before browsing source.
- If it does not exist, initialize with `graphify update .` (AST-only, no API cost).
- After code changes, run `graphify update .` to keep the graph fresh.
- Dirty graph files are expected after hooks — not a reason to skip graphify.

## delegation

Mandates delegating work that fits a subagent's specialization, and running independent subtasks **in parallel** in a single message. Covers when to delegate (specialized work, context isolation, research-heavy tasks) and when not to (trivial 1-2 tool-call tasks, tasks requiring current context, quick fixes with known causes).

## workers

Scoped to Cloudflare Workers work (`.ts`/`.tsx`/`.js`/wrangler files). Mandates retrieving current Cloudflare documentation before Workers, KV, R2, D1, Durable Objects, Queues, Vectorize, or AI tasks — training data may be outdated. Includes doc links, `npx wrangler` commands, and limits pages.
