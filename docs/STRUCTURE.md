# Repository Structure

This document explains every folder and file in the oh-my-kilo repository — what it is, what it does, and whether it gets copied into your Kilo config dir on install.

```
oh-my-kilo/
├── AGENTS.md          # Global Kilo instructions (loaded every session)
├── README.md          # This project's front page
├── SECURITY.md        # Security policy & credential-safety model
├── LICENSE            # MIT license
├── .gitignore         # Ignores real config, machine state, working dirs
│
├── agents/            # 12 agent system prompts (markdown + frontmatter)
│   ├── code.md        #   primary agent: implementation, orchestration
│   ├── debug.md       #   systematic debugging, root cause analysis
│   ├── ask.md         #   read-only Q&A
│   ├── planner.md     #   architecture, implementation plans
│   ├── auditor.md     #   repo-wide audits, parallel delegation
│   ├── general.md     #   multi-step research/execution
│   ├── explore.md     #   codebase reconnaissance
│   ├── tester.md      #   test suites
│   ├── security.md    #   security audits (OWASP)
│   ├── librarian.md   #   external knowledge retrieval
│   ├── documentarian.md # documentation writing
│   └── designer.md    #   UI/UX implementation
│
├── commands/          # Slash commands
│   └── graphify.md    #   /graphify — build/query knowledge graphs
│
├── rules/             # Global rules loaded at session start
│   ├── language.md            # English-only file content
│   ├── agentmemory.md         # mandatory memory search/save
│   ├── skill-reminder.md      # mandatory skill check before tasks
│   ├── graphify.md            # knowledge-graph-first navigation
│   ├── delegation.md          # subagent delegation policy
│   └── workers.md             # Cloudflare Workers doc-first rule
│
├── docs/              # Pack documentation (safe to keep after install)
│   ├── INSTALL.md     #   install/uninstall/troubleshooting
│   ├── STRUCTURE.md   #   this file — repo layout explained
│   ├── AGENTS.md      #   agent table, when-to-use, model recommendations
│   ├── SKILLS.md      #   skill table + enablement
│   ├── RULES.md       #   rules reference
│   ├── COMMANDS.md    #   command reference
│   └── CONFIGURATION.md # kilo.jsonc block reference
│
└── skills/            # 49 prompt-based skills (community packs)
    ├── agent-md-refactor/    # ...
    ├── caveman/              # ...
    └── ...                   # 47 more, each a folder with SKILL.md
```

## What gets copied to `~/.config/kilo`

| Path | Copied? | Notes |
|------|---------|-------|
| `AGENTS.md` | yes | Global instructions, loaded automatically |
| `agents/` | yes | System prompts for the 12 agents |
| `commands/` | yes | Slash commands |
| `rules/` | yes | Loaded via `instructions` config key |
| `skills/` | yes | Must be registered in `skills.paths` |
| `docs/` | yes | Reference material; optional to copy |
| `README.md`, `SECURITY.md`, `LICENSE`, `.gitignore` | no | Repo-only files |

## Design decisions

- **System prompts are files, not config.** The `agents/*.md` files are the single source of truth for agent prompts. Model/variant/temperature belong in `kilo.jsonc` via Kilo Settings — never in frontmatter. Restrictive `permission:` blocks do ship in frontmatter on the restricted agents (`security`, `tester`, `documentarian`, `planner`) and are honored at runtime.
- **Rules are always-on guardrails.** Four of six rules use `alwaysApply: true` so language, memory, skills, and graphify behavior never drift between sessions.
- **No config template in the pack.** Real `kilo.jsonc` is machine-specific and gitignored. The pack documents reference blocks in `docs/CONFIGURATION.md` instead.
- **Skills are layered, not locked.** Skills are copied as-is from community packs; you can edit, add, or delete any skill folder.
