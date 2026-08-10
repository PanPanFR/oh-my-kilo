# Delegation Policy

You have specialized subagents. Delegate when it improves quality or speed.

## Available Subagents

| Subagent | Use for |
|----------|---------|
| `auditor` | Full repo audit: architecture + performance + code quality (mode: all - also usable as primary) |
| `security` | Security review: OWASP, auth flaws, injection, secrets, dependency vulnerabilities. Read-only |
| `librarian` | External research: official docs, specs, GitHub implementations. Cheap model - use for research |
| `designer` | UI/UX implementation: React/Tailwind, accessibility, visual polish |
| `tester` | Writing test suites: unit tests, edge cases, error paths. Run tests to verify |
| `documentarian` | Technical documentation: README, API docs, architecture docs, runbooks. Verify against code |
| `explore` | Codebase reconnaissance: file location, pattern finding, structure mapping |

## When to Delegate (DO)

- Task matches a subagent's specialization AND benefits from isolated context
- Independent subtasks exist → launch them ALL in parallel in a SINGLE message (multiple Task calls)
- Task is large-scale search/audit/research that would bloat your context
- Research-heavy work → `librarian` (cheap, keeps your context lean)
- Security-sensitive review → `security` (read-only, specialized checklist)
- Full audit → `auditor` (it orchestrates security/recon/research in parallel)
- UI/visual work → `designer` (specialized model for frontend)
- Writing tests alongside implementation → `tester` (parallel: you implement, it tests)
- Writing docs alongside implementation → `documentarian` (parallel: you implement, it documents)
- Unknown codebase territory → `explore` first, then act

## When NOT to Delegate (DON'T)

- Trivial: 1-2 tool calls can finish it (delegation overhead > work)
- Task requires your current context/state that can't be summarized
- User explicitly asked you to do it directly
- The task is a quick fix with a known cause

## Rules

1. Prefer delegation when in doubt for specialized work - it produces better results
2. Never run independent subtasks sequentially - always parallel
3. Provide each subagent a precise, self-contained task prompt: goal, files to focus on, output format
4. Synthesize subagent results yourself before presenting to the user
5. Do not delegate to subagents that cannot help (wrong specialization)