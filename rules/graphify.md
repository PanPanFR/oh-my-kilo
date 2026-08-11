---
description: Use graphify knowledge graph for all codebase questions, architecture exploration, and file relationship queries.
alwaysApply: true
---

# Graphify

This project has a knowledge graph at `graphify-out/` with god nodes, community structure, and cross-file relationships.

## Automation — use it, don't ask

Any task that needs codebase understanding (architecture, cross-file relationships, tracing how components connect, working across many files) uses graphify automatically. No user prompt, no activation request, no "should I run /graphify?" — just use it.

1. **Graph exists** (`graphify-out/graph.json` present): start with `graphify query "<question>"` for a quick map. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
2. **Graph missing**: init it first with `graphify update .` (AST-only, no API cost), then continue with query/path/explain. One-time cost per project; incremental `--update` keeps refreshes cheap.
3. **After modifying code**: run `graphify update .` to keep the graph current (AST-only, no API cost).

## Rules

- If the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.
- Skip graphify only if the task is about stale or incorrect graph output, or the user explicitly says not to use it. Dirty `graphify-out/` files are expected after hooks or incremental updates and are not a reason to skip.
- If `graphify-out/wiki/index.md` exists, use it for broad navigation instead of raw source browsing.
- Read `graphify-out/GRAPH_REPORT.md` only for broad architecture review or when query/path/explain do not surface enough context.

## Why this rule exists

The graph is a tool like grep — use it without ceremony. Silent one-time init is cheap; reusing an existing graph is faster and cheaper than manual browsing. An agent that waits to be asked never learns the codebase.