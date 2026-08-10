# Skills

oh-my-kilo ships 49 skills covering writing, code review, planning, agents, config, UI, devops, and more. They are **curated from popular community skill packs** (obra/superpowers, mattpocock/skills, vercel-labs/skills, and others) — selected, deduplicated, and grouped by category, so you get the best-known workflows without installing each pack yourself.

## How Skills Work

Skills are loaded automatically at session start (or after `/reload`). Each skill provides specialized instructions and workflows for specific task types. The `skill-reminder` rule ensures every implementation task checks for a matching skill before starting.

## How to Enable

Skills are enabled when the `skills.paths` key in your `kilo.jsonc` points to the installed `skills/` directory. Add this to your `kilo.jsonc`:

```jsonc
"skills": {
  "paths": [
    "C:\\Users\\<YourUser>\\.config\\kilo\\skills"
  ]
}
```

Or via **Kilo Settings UI**: Settings → Agent Behaviour → Skills → scroll to bottom → add `C:\Users\<YourUser>\.config\kilo\skills`.

Without this, Kilo looks in `%USERPROFILE%\.kilo\skills\` by default — you'd need to copy skills there manually.

## Skill Table

| Skill | Category | Description |
|-------|----------|-------------|
| agent-md-refactor | agents | Refactor bloated AGENTS.md files to progressive disclosure |
| artifacts-builder | UI | Elaborate multi-component HTML artifacts with React/Tailwind/shadcn |
| cavecrew | agents | Delegate to caveman-style subagents for compressed output |
| caveman | config | Ultra-compressed communication mode (~65% token reduction) |
| caveman-compress | config | Compress memory files to caveman format |
| caveman-review | code-review | Ultra-compressed code review comments |
| clean-code | code-review | Clean Code principles by Robert C. Martin |
| cloudflare | devops | Cloudflare Workers, D1, R2, KV, AI, DO, Wrangler |
| code-review | code-review | Standards + Spec review against a fixed point |
| codebase-design | planning | Deep module design, architectural friction |
| diagnosing-bugs | debugging | Diagnosis loop for hard bugs and performance regressions |
| documentation | writing | Technical documentation with Diátaxis framework |
| domain-modeling | planning | Build and sharpen domain models |
| executing-plans | planning | Execute written implementation plans with review checkpoints |
| finishing-a-development-branch | devops | Complete development and integrate work |
| git-commit | devops | Conventional commit with intelligent staging |
| graphify | config | Knowledge graph queries and codebase navigation |
| grilling | planning | Stress-test plans, decisions, ideas |
| handoff | agents | Compact conversation into handoff document |
| improve-codebase-architecture | planning | Scan for deepening opportunities, visual HTML report |
| migrate-to-shoehorn | code-review | Migrate test files from `as` to shoehorn |
| ponytail | config | Lazy senior dev — YAGNI extremist |
| ponytail-audit | code-review | Whole-repo audit for over-engineering |
| ponytail-review | code-review | Diff review focused on over-engineering |
| prototype | UI | Throwaway prototype to answer design questions |
| pwa-development | UI | Progressive Web Apps — service workers, offline |
| receiving-code-review | code-review | Handle code review feedback with rigor |
| requesting-code-review | code-review | Request review before merging |
| resolving-merge-conflicts | devops | Resolve in-progress git merge/rebase conflicts |
| subagent-driven-development | agents | Execute implementation plans with independent tasks |
| systematic-debugging | debugging | Systematic debugging before proposing fixes |
| teach | writing | Teach new skills or concepts |
| test-driven-development | testing | TDD — write tests before implementation |
| to-questionnaire | planning | Turn decisions into questionnaires |
| to-spec | planning | Turn conversation into a spec |
| to-tickets | planning | Break plan into tracer-bullet tickets |
| triage | planning | Move issues/PRs through triage roles |
| ui-design | UI | UI/UX design intelligence for web and mobile |
| using-git-worktrees | devops | Isolated git worktree for feature work |
| vercel-react | UI | Vercel/Next.js best practices |
| verification-before-completion | devops | Evidence before claiming completion |
| wayfinder | planning | Plan huge work as decision tickets |
| web-perf | UI | Core Web Vitals and page speed audit |
| wizard | devops | Interactive bash wizard for human-only steps |
| writing-beats | writing | Assemble raw material into a journey of beats |
| writing-for-agents | writing | Writing documents for agents |
| writing-fragments | writing | Mine raw fragments, no structure yet |
| writing-plans | planning | Create implementation plans from specs |
| writing-skills | writing | Create, edit, verify skills |