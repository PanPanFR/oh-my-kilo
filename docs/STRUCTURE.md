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
├── agents/            # 6 agent system prompts (markdown + frontmatter)
│   ├── code.md        #   primary agent: implementation, audit lenses, UI protocols
│   ├── debug.md       #   systematic debugging, root cause analysis
│   ├── ask.md         #   read-only Q&A
│   ├── plan.md        #   architecture, implementation plans (.kilo/plans/ only)
│   ├── general.md     #   research/tests/security/docs subagent
│   └── explore.md     #   codebase reconnaissance
│
├── command/           # Slash commands
│   └── update-pack.md #   /update-pack — pull + sync pack into config + register rules
│
├── rules/             # Global rules loaded at session start
│   ├── language.md            # English-only file content
│   ├── agentmemory.md         # mandatory memory search/save
│   ├── skill-reminder.md      # mandatory skill check before tasks
│   ├── graphify.md            # knowledge-graph-first navigation
│   ├── delegation.md          # subagent delegation policy
│   ├── workers.md             # Cloudflare Workers doc-first rule
│   └── communication-style.md # caveman replies + ponytail code style
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
└── skills/            # 24 prompt-based skills (community packs)
    ├── caveman/              # ...
    └── ...                   # 23 more, each a folder with SKILL.md
```

## What gets copied to `~/.config/kilo`

| Path | Copied? | Notes |
|------|---------|-------|
| `AGENTS.md` | yes | Global instructions, loaded automatically |
| `agents/` | yes | System prompts for the 10 agents |
| `command/` | yes | Slash commands |
| `rules/` | yes | Loaded via `instructions` config key |
| `skills/` | yes | Must be registered in `skills.paths` |
| `docs/` | yes | Reference material; optional to copy |
| `README.md`, `SECURITY.md`, `LICENSE`, `.gitignore` | no | Repo-only files |

## Design decisions

- **System prompts are files, not config.** The `agents/*.md` files are the single source of truth for agent prompts. Model/variant/temperature belong in `kilo.jsonc` via Kilo Settings — never in frontmatter. Restrictive `permission:` blocks do ship in frontmatter on the restricted agents (`plan`, and read-only scopes on `ask`) and are honored at runtime.
- **Rules are always-on guardrails.** Four of six rules use `alwaysApply: true` so language, memory, skills, and graphify behavior never drift between sessions.
- **No config template in the pack.** Real `kilo.jsonc` is machine-specific and gitignored. The pack documents reference blocks in `docs/CONFIGURATION.md` instead.
- **Skills are layered, not locked.** Skills are copied as-is from community packs; you can edit, add, or delete any skill folder.
