# Changelog

All notable changes to oh-my-kilo are documented here.

## [0.2.2] — 2026-08-11

### Changed
- **Rules registration documented** — rules are not auto-loaded from the `rules/` folder; install steps now include registering each rule in `kilo.jsonc` `instructions` (or via Settings → Agent Behaviour → Rules → Add Additional Instruction Files). README, INSTALL.md, CONFIGURATION.md, RULES.md references updated; rule count bumped to 7 (`communication-style` added to the table).

## [0.2.1] — 2026-08-11

### Changed
- **`commands/` renamed to `command/`** — matches the actual Kilo config layout (`~/.config/kilo/command/`), so install copies land directly in the right place and no duplicate command folder is created. Docs and install snippets updated.

## [0.2.0] — 2026-08-10

### Added
- **Protocols section** in `docs/AGENTS.md` — 10 built-in agent workflows documented: Project Artifacts, Plan File, User Confirmation Loop, Handoff to Code, Task Triage, Execution Discipline, UI/Frontend Rule, Docs Folder, Test Folder, Capability Handoff
- **Pantheon-style agent profiles** in `docs/AGENTS.md` — each agent has an evocative title (The Architect, The Root-Cause Hunter, etc.), one-line quote, and metadata block (Role, Mode, Prompt, Model guidance, Recommended models)
- **Pantheon-style rules** in `docs/RULES.md` — Problem → What it changes → Trade-off format for all 6 rules
- **Categorized skill tables** in `docs/SKILLS.md` — 49 skills grouped by category: Core, Code Review, Planning, Agents, Config, UI, DevOps, Debugging, Writing
- **Example Workflows** section in README — 5 real prompts with before/after comparison (with vs without oh-my-kilo)
- **Setup Tiers** — Minimal / Recommended / Full, with clear guidance on what each adds
- **Backup disclaimer + rollback** — tells users to backup their existing Kilo config before installing, with clear restore steps
- **Compatibility matrix** — platform/tool tested/untested status (Kilo CLI, VS Code, Windows, Linux, macOS, graphify, agentmemory, MCP)
- **Known Limitations** section — 5 common configuration gotchas
- **Credits section** — acknowledges [oh-my-opencode-slim](https://github.com/alvinunreal/oh-my-opencode-slim) as inspiration
- **CONTRIBUTING.md** — contribution guidelines
- `rules/communication-style.md` — extracted Caveman/Ponytail style blocks (alwaysApply rule), replacing 12 duplicate copies across agents
- `shadcn-components.tar.gz.sha256` — checksum for binary blob verification
- **Graphify user-activation rule** — when a task could benefit from graphify but the user hasn't activated it, the agent proactively tells the user about `/graphify` before continuing

### Changed
- **README rewrite** — restructured for publishability: one-line pitch at top, What/Who/What do you get, Quick Start, then detail. Goal: new user understands the pack in 30 seconds
- **README agent table** — split into Primary 🔷 and Subagents 🔶 with Pantheon-style naming
- **Removed "not for beginners"** positioning — oh-my-kilo is for everyone, from first session to daily power use
- docs/AGENTS.md — replaced flat bullet-point "When to Use" with structured table and narrative descriptions per agent

### Fixed
- **8 broken skill references** removed from `AGENTS.md` and `rules/skill-reminder.md` — `api-designer`, `code-reviewer`, `db-specialist`, `devops-agent`, `frontend-specialist`, `perf-optimizer`, `web-audit-orchestrator`, `kilo-config` did not exist
- **Shell injection** in `skills/artifacts-builder/scripts/init-artifact.sh` — `$PROJECT_NAME` now escaped before sed interpolation
- **Word splitting** in `skills/systematic-debugging/find-polluter.sh` — `for $TEST_FILES` replaced with `while IFS= read -r` loop; added `set -euo pipefail`
- **Regex injection** in `skills/wizard/template.sh` — `grep -E` replaced with `grep -F` (literal match) for user-provided key names
- **Plaintext .env permissions** — `chmod 600` added after writing `.env` files in `wizard/template.sh`
- **Nested duplicate removed** — `skills/codebase-design/codebase-design/` was a copy-paste artifact with slightly different content
- **Duplicate LICENSE** — removed redundant Apache 2.0 `LICENSE` and `LICENSE.txt` from `skills/artifacts-builder/` (root MIT license applies)
- **SECURITY.md** — changed "open an issue" to "use GitHub Security Advisories" for responsible vulnerability disclosure
- **.gitignore** — added `.DS_Store`, `*.swp`, `*.bak` to prevent editor/OS noise in git status

### Removed
- **Caveman/Ponytail duplication** — identical 15-line blocks removed from all 12 agent files, consolidated into `rules/communication-style.md` with `alwaysApply: true`

---

## [0.1.0] — Initial Release

- 12 curated agents (6 primary + 6 subagents)
- 49 skills across 9 categories (curated from community packs)
- 6 global rules (language, agentmemory, skill-reminder, graphify, delegation, workers)
- `/graphify` command for codebase knowledge graphs
- MCP support: agentmemory (required), context7, chrome-devtools, playwright (recommended)
