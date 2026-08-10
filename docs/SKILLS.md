# Skills

49 skills covering writing, code review, planning, agents, config, UI, devops, debugging, and testing. **Curated from popular community skill packs** (obra/superpowers, mattpocock/skills, vercel-labs/skills, and others) — selected, deduplicated, and grouped by category, so you get the best-known workflows without installing each pack yourself.

## How Skills Work

Skills are loaded automatically at session start (or after `/reload`). Each skill provides specialized instructions and workflows for specific task types. The `skill-reminder` rule ensures every implementation task checks for a matching skill before starting.

## How to Enable

Skills are enabled when the `skills.paths` key in your `kilo.jsonc` points to the installed `skills/` directory:

```jsonc
"skills": {
  "paths": [
    "C:\\Users\\<YourUser>\\.config\\kilo\\skills"
  ]
}
```

Or via **Kilo Settings UI**: Settings → Agent Behaviour → Skills → scroll to bottom → add `C:\Users\<YourUser>\.config\kilo\skills`.

---

## Core — Use these every day

Skills that match the most common development tasks. The `skill-reminder` rule loads these automatically.

| Skill | What it does |
|-------|-------------|
| `clean-code` | Clean Code principles — naming, structure, readability |
| `code-review` | Standards + spec review against a fixed reference point |
| `documentation` | Technical documentation with the Diátaxis framework (tutorials, how-tos, reference, explanation) |
| `git-commit` | Conventional commit with intelligent staging |
| `test-driven-development` | TDD — write tests before implementation, red-green-refactor |
| `systematic-debugging` | Reproduce → isolate → hypothesis → fix; no shotgun debugging |
| `verification-before-completion` | Evidence-backed completion — never claim done without running tests/lint/build |

## Code Review — Review culture and over-engineering audits

Skills for reviewing code, catching over-engineering, and handling review feedback.

| Skill | What it does |
|-------|-------------|
| `caveman-review` | Ultra-compressed code review comments (~65% token reduction) |
| `migrate-to-shoehorn` | Migrate test files from `as` cast to shoehorn assertions |
| `ponytail-audit` | Whole-repo audit for over-engineering — what to delete |
| `ponytail-review` | Diff review focused on over-engineering — YAGNI extremist lens |
| `receiving-code-review` | Handle incoming code review feedback with rigor |
| `requesting-code-review` | Request review before merging — structured review prompts |

## Planning — Design, specs, tickets, plan execution

Skills for designing systems, turning conversations into specs, and executing structured plans.

| Skill | What it does |
|-------|-------------|
| `codebase-design` | Deep module design, architectural friction, design opportunities |
| `domain-modeling` | Build and sharpen domain models — entities, boundaries, relationships |
| `executing-plans` | Execute written implementation plans with review checkpoints |
| `grilling` | Stress-test plans, decisions, and ideas — challenge assumptions |
| `improve-codebase-architecture` | Scan for architectural deepening opportunities, visual HTML report |
| `to-questionnaire` | Turn decisions into questionnaires — structured choice-making |
| `to-spec` | Turn a conversation into a spec document |
| `to-tickets` | Break a plan into tracer-bullet tickets |
| `triage` | Move issues/PRs through triage roles |
| `wayfinder` | Plan huge work as decision tickets — structure before execution |
| `writing-plans` | Create implementation plans from specs — structured, verifiable |

## Agents — Workflow, delegation, handoffs

Skills for working with agent-based workflows, delegation patterns, and handoffs.

| Skill | What it does |
|-------|-------------|
| `agent-md-refactor` | Refactor bloated AGENTS.md files to progressive disclosure |
| `cavecrew` | Delegate to caveman-style subagents for compressed output |
| `handoff` | Compact a conversation into a handoff document for session continuity |
| `subagent-driven-development` | Execute implementation plans with independent parallel tasks |

## Config — Communication modes, knowledge graphs, lazy coding

Low-level config and communication style skills.

| Skill | What it does |
|-------|-------------|
| `caveman` | Ultra-compressed communication mode (~65% token reduction) |
| `caveman-compress` | Compress memory files to caveman format |
| `graphify` | Knowledge graph queries and codebase navigation |
| `ponytail` | Lazy senior dev — YAGNI extremist, shortest working path |

## UI — Frontend, PWA, performance

Skills for building user interfaces, Progressive Web Apps, and performance auditing.

| Skill | What it does |
|-------|-------------|
| `artifacts-builder` | Elaborate multi-component HTML artifacts with React/Tailwind/shadcn |
| `prototype` | Throwaway prototype to answer design questions fast |
| `pwa-development` | Progressive Web Apps — service workers, offline, installability |
| `ui-design` | UI/UX design intelligence for web and mobile |
| `vercel-react` | Vercel/Next.js best practices and conventions |
| `web-perf` | Core Web Vitals and page speed audit |

## DevOps — Git, deployment, verification

Skills for git workflows, deployment, and making sure work is actually done.

| Skill | What it does |
|-------|-------------|
| `cloudflare` | Cloudflare Workers, D1, R2, KV, AI, DO, Wrangler, Email, Turnstile |
| `finishing-a-development-branch` | Complete development and integrate work — the final mile |
| `resolving-merge-conflicts` | Resolve in-progress git merge/rebase conflicts |
| `using-git-worktrees` | Isolated git worktree for feature work — no branch switching |
| `wizard` | Interactive bash wizard for human-only steps (environment setup, manual config) |

## Debugging — Diagnosis loops before fixes

Skills for finding the real bug before attempting a fix.

| Skill | What it does |
|-------|-------------|
| `diagnosing-bugs` | Diagnosis loop for hard bugs and performance regressions — confirm before fixing |

## Writing — Technical docs, teaching, structured writing

Skills for writing documentation, teaching, and structured content workflows.

| Skill | What it does |
|-------|-------------|
| `teach` | Teach new skills or concepts — structured learning material |
| `writing-beats` | Assemble raw material into a journey of beats — narrative structure |
| `writing-for-agents` | Write documents designed for agents — clear, actionable, structured |
| `writing-fragments` | Mine raw fragments first, add structure later — writing without front-loading |
| `writing-skills` | Create, edit, and verify skills — the meta-skill |
