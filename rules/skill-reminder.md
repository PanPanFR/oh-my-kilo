---
description: MANDATORY skill loading before any implementation task. Never skip skill check.
alwaysApply: true
---

# Skill Check - Every Task

Before implementing: identify task type -> load matching skill via `skill` tool -> follow its instructions. Most specific skill wins; multiple independent concerns -> load all in parallel. No task too small. If unsure -> load anyway (irrelevant skill costs nothing; skipped relevant one costs quality).

| Task involves... | Load skill |
|------------------|-----------|
| Docs, README, runbook, API docs | `documentation` |
| Tests, TDD, test strategy | `test-driven-development` |
| Module design, architecture | `codebase-design` |
| UI/UX, components, accessibility | `ui-design` |
| Code review, clean code, naming | `clean-code` |
| Page speed, Core Web Vitals | `web-perf` |
| Git commits, conventional commits | `git-commit` |
| PWA, service workers | `pwa-development` |
| Vercel/Next.js best practices | `vercel-react` |
| Cloudflare (Workers, D1, R2, KV, AI, DO, Wrangler, One, Email, Turnstile) | `cloudflare` |
| Over-engineering review | `ponytail-review` |
| Repo bloat audit | `ponytail-audit` |
| Lazy/minimal coding, YAGNI | `ponytail` |
| Caveman communication | `caveman` |
| Knowledge graph queries | `graphify` |

Skill loading happens BEFORE any code is written or command is run.
