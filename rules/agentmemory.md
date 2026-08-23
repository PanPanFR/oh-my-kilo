---
description: MANDATORY — Always use agentmemory MCP tools for persistent context, session recall, and knowledge retention. FIRST action before any task.
alwaysApply: true
---

# 🛑 MANDATORY: Agent Memory — CHECK FIRST, ALWAYS

**STOP. Before doing ANYTHING else for this user, run `memory_smart_search`.**

This is NOT optional. This is NOT a suggestion. Skipping memory search = ignoring prior context = wasted work.

## Pre-Flight Checklist (EVERY session, EVERY task)

- [ ] **Step 1 — RECALL**: Run `memory_smart_search` with relevant keywords from user's request
- [ ] **Step 2 — CHECK**: If results found, read them and incorporate prior context
- [ ] **Step 3 — PROCEED**: Only then begin the actual task

## MANDATORY Save Points

You MUST call `memory_save` at these moments — no exceptions:

| Trigger | Action |
|---------|--------|
| User asks about existing code | `memory_smart_search` FIRST |
| User mentions previous work | `memory_smart_search` for that topic |
| Made a non-trivial decision | `memory_save` decision + reasoning |
| Found a bug or pattern | `memory_save` the pattern |
| Encountered an error worth remembering | `memory_save` error + fix |
| Completed a task | `memory_save` session recap with outcomes |
| Switching projects | `memory_handoff` to persist context |

## Fallback (when the agentmemory MCP tools are unavailable)

If `memory_smart_search` and friends do not appear (agentmemory server down / MCP failed to load), use Kilo's built-in tools:
- `kilo_memory_recall` — recall project memory (mode search/typed/catalog)
- `kilo_memory_save` — save facts/decisions/corrections

All recall/save rules above still apply - just use the built-in tool names.

## Tools (all available via MCP)

- `memory_smart_search` — semantic search across all past sessions
- `memory_save` — persist observations, decisions, context
- `memory_sessions` — list/review past sessions
- `memory_handoff` — transfer context between sessions

## Rule

**NEVER skip memory search when working on code that may have prior history.**
**NEVER finish a session without saving key outcomes.**
**If unsure whether to search — SEARCH.**
