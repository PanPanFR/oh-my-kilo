---
description: Use graphify knowledge graph for all codebase questions, architecture exploration, and file relationship queries.
alwaysApply: true
---

# Graphify

This project has a knowledge graph at `graphify-out/` with god nodes, community structure, and cross-file relationships.

## If the user types `/graphify`

Use the installed graphify skill or instructions before doing anything else.

## If a task involves understanding the codebase

When a task needs codebase understanding — exploring architecture, finding file relationships, tracing how components connect, or working across many files — and **the user has not invoked `/graphify` yet**:

1. **Tell the user, don't silently skip.** Briefly say that `/graphify` would make this task faster and more accurate, and explain what it does in one line: *"it builds a searchable knowledge graph of the codebase — queries, cross-file paths, and concept explanations, so I don't have to grep everything manually."*
2. **Ask them to run `/graphify` first** (or offer: "want me to explain how to enable it?").
3. **Proceed only after they respond.** If they say no or skip it, continue without it — but say you're working without the graph.

## If the user has already run `/graphify` (graph exists)

- For codebase questions, first run `graphify query "<question>"` when `graphify-out/graph.json` exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty `graphify-out/` files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If no graph exists yet (`graphify-out/graph.json` is missing): INIT it first with `graphify update .` (AST-only, no API cost) before large codebase work, then continue with query/path/explain.
- If `graphify-out/wiki/index.md` exists, use it for broad navigation instead of raw source browsing.
- Read `graphify-out/GRAPH_REPORT.md` only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Why this rule exists

Not everyone knows graphify exists or what it does. Silent init or silent skip both hide value from the user. This rule makes the agent surface the option explicitly, so the user can decide — and once the graph is on, navigation is graph-first.
