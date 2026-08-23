# Skills

24 skills covering daily development, planning, review, communication, UI, platform work, and meta-workflows. **Curated from popular community skill packs** (obra/superpowers, mattpocock/skills, vercel-labs/skills, and others) — selected, deduplicated, and trimmed to what earns its place in every session's skill list.

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

| Skill | What it does |
|-------|-------------|
| `clean-code` | Clean Code principles — naming, structure, readability |
| `code-review` | Standards + spec review against a fixed reference point, parallel sub-agents |
| `documentation` | Technical documentation with the Diátaxis framework |
| `git-commit` | Conventional commit with intelligent staging |
| `systematic-debugging` | Reproduce → isolate → hypothesis → fix; no shotgun debugging |
| `test-driven-development` | TDD — write tests before implementation, red-green-refactor |
| `verification-before-completion` | Evidence-backed completion — never claim done without running tests/lint/build |

## Planning & Architecture

| Skill | What it does |
|-------|-------------|
| `codebase-design` | Deep module design, architectural friction, design opportunities |
| `executing-plans` | Execute written implementation plans with review checkpoints |
| `grilling` | Stress-test plans, decisions, and ideas — challenge assumptions |
| `writing-plans` | Create implementation plans from specs — structured, verifiable |

## Over-Engineering Audits

| Skill | What it does |
|-------|-------------|
| `ponytail-audit` | Whole-repo audit for over-engineering — what to delete |
| `ponytail-review` | Diff review focused on over-engineering — YAGNI extremist lens |

## Communication & Config

| Skill | What it does |
|-------|-------------|
| `caveman` | Ultra-compressed communication mode (~65% token reduction); includes file compression and terse review-comment formats |
| `graphify` | Knowledge graph queries and codebase navigation |
| `ponytail` | Lazy senior dev — YAGNI extremist, shortest working path |

## Workflow & Git

| Skill | What it does |
|-------|-------------|
| `handoff` | Compact a conversation into a handoff document for session continuity |
| `resolving-merge-conflicts` | Resolve in-progress git merge/rebase conflicts |

## UI & Performance

| Skill | What it does |
|-------|-------------|
| `pwa-development` | Progressive Web Apps — service workers, offline, installability |
| `ui-design` | UI/UX design intelligence for web and mobile |
| `vercel-react` | Vercel/Next.js best practices and conventions |
| `web-perf` | Core Web Vitals and page speed audit |

## Platform

| Skill | What it does |
|-------|-------------|
| `cloudflare` | Cloudflare Workers, D1, R2, KV, AI, DO, Wrangler, Email, Turnstile — unified retrieval-first skill |

## Meta

| Skill | What it does |
|-------|-------------|
| `writing-skills` | Create, edit, and verify skills — the meta-skill |
