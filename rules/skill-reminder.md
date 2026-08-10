---
description: MANDATORY skill loading before any implementation task. Never skip skill check.
alwaysApply: true
---

# 🛑 MANDATORY: Skill Check — EVERY Task

**STOP. Before implementing ANY task, check if a matching skill exists. Load the skill FIRST, then follow its instructions.**

Skipping skill loading = ignoring built-in best practices = lower quality output.

## Pre-Flight (EVERY implementation task)

1. **IDENTIFY**: What type of task is this? (code, docs, UI, test, deploy, review, etc.)
2. **MATCH**: Check the table below for a matching skill
3. **LOAD**: Call `skill` tool with the matched skill name
4. **FOLLOW**: Execute according to the skill's instructions
5. **THEN**: Begin implementation

## Skill Map

| If task involves... | Load skill |
|---------------------|-----------|
| Writing docs, README, runbook, API docs, architecture doc | `documentation` |
| Writing tests, test strategy, test plan, TDD | `test-driven-development` |
| Designing modules, architecture review, deepening opportunities | `codebase-design` |
| UI/UX work, designing pages, components, colors, typography, accessibility | `ui-design` |
| Code review, clean code, naming, readability | `clean-code` |
| Page speed, Core Web Vitals, performance audit | `web-perf` |
| Git commits, conventional commits | `git-commit` |
| PWA development, service workers | `pwa-development` |
| Vercel/Next.js best practices | `vercel-react` |
| Cloudflare (Workers, D1, R2, KV, AI, DO, Wrangler, One, Email, Turnstile) | `cloudflare` |
| Over-engineering review, simplify codebase | `ponytail-review` |
| Repo bloat audit, find what to delete | `ponytail-audit` |
| Lazy/minimal coding, YAGNI, shortest path | `ponytail` |
| Caveman communication, terse output | `caveman` |
| Kilo config questions | `kilo-config` |
| Knowledge graph queries, codebase exploration | `graphify` |

## Rule

**NEVER skip skill loading for matching tasks.**
**If unsure whether a skill matches — LOAD IT. Loading a skill that turns out irrelevant costs nothing. Skipping one that matters costs quality.**
**Skill loading MUST happen BEFORE any code is written or command is run.**