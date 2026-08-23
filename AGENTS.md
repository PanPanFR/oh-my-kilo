# Kilo Code Global Instructions

Global rules live in `rules/*.md` (loaded via `instructions` in kilo.jsonc) - single source of truth. This file only indexes them; do not duplicate their content here.

- Language: ALL file contents English; Indonesian chat-only -> `rules/language.md`
- Comms/code style: Caveman + Ponytail -> `rules/communication-style.md`
- Memory: agentmemory recall before work, save after outcomes -> `rules/agentmemory.md`
- Skills: load matching skill before implementing -> `rules/skill-reminder.md`
- Graphify: knowledge graph before manual code browsing -> `rules/graphify.md`
- Delegation: parallel subagents for independent subtasks -> `rules/delegation.md`

Active modes: Caveman (~65% fewer output tokens), Ponytail (~54% less code bloat), AgentMemory (persistent cross-session memory), Graphify (codebase knowledge graph).
