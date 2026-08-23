# Changelog

All notable changes to oh-my-kilo are documented here.

## [0.4.2] - 2026-08-23

### Added
- **`plugins/graphify.js` — protocol enforcement plugin.** Rules alone proved too easy for models to skip (both first-action protocols went unused in real tasks). The plugin enforces them mechanically:
  - Injects a mandatory protocol block (memory recall -> graphify query/init -> memory save) into every session's system prompt via `experimental.chat.system.transform` — highest-priority context, independent of rules-file position.
  - Prefixes the session's first bash call with a one-line reminder that fires even when the project has no graph yet (previously the reminder was silent unless `graphify-out/graph.json` already existed, and only on bash).
  - Registered via the `plugin` key in the **global** `kilo.jsonc`; see INSTALL.md Step 5.

### Changed
- **Recommended `instructions` order: protocol rules first** — `agentmemory.md` and `graphify.md` now listed before the other five rules in all docs (README, RULES.md, CONFIGURATION.md, INSTALL.md). Global `instructions` are the lowest injection priority; earliest entries land earliest in context and get measurably better compliance from weaker models.
- **`/update-pack` syncs `plugins/`** and registers new plugins in the global config.

### Fixed
- **Plugin registration scope** — the graphify plugin was previously registered in a project-scope `.kilo/kilo.json`, which only loads when Kilo runs from that exact directory. In every other project the plugin was silently absent. Docs now state the registration must live in the global config, and INSTALL.md includes a troubleshooting entry for it.

## [0.4.1] - 2026-08-23

### Changed
- **Prompt payload slimmed ~55%** - always-on instruction load cut from 327 to 147 lines (~1,500 tokens saved per request) by removing cross-file duplication:
  - Root `AGENTS.md` reduced 129 -> 12 lines; now a thin index pointing to `rules/*.md` as the single source of truth (language, caveman/ponytail, agentmemory, skill-reminder, graphify, delegation sections were duplicated verbatim).
  - `rules/agentmemory.md` 51 -> 13 lines, `rules/skill-reminder.md` 44 -> 28, `rules/graphify.md` 27 -> 18 - same behavior, no filler ("why this rule exists" essays, repeated NEVER-SKILL warnings, tool-name listings already in the system tool list).
  - `agents/code.md` 44 -> 26 lines - dropped sections duplicating global rules (graphify, delegation, language); merged duplicate UI threshold wording.
  - `agents/plan.md` 117 -> 64 lines - "cannot edit" prose folded into one line (already enforced by the `permission:` frontmatter); artifacts and plan-file protocols compressed, all requirements kept.
- No behavioral changes intended: every rule, protocol, and requirement is preserved in exactly one place.

### Fixed
- **Docs resynced with actual prompts** - removed stale claims not present in any pack file: `code` "audit lenses" protocol (architecture/performance/quality tiers) and WCAG 2.2 AA/component-states bullets (`docs/AGENTS.md`, README agents table, `docs/STRUCTURE.md` tree); STRUCTURE tree now lists all 10 agent files with correct roles; rule count fixed ("four of six" -> "five of seven" alwaysApply).

## [0.4.0] - 2026-08-23

### Changed
- **Skills curated 49 -> 24** - removed redundant/niche skills (duplicate debugging loops, tracker-dependent workflows, one-off utilities); `caveman-compress` + `caveman-review` merged into `caveman` as compact sections.
- **Agent roster expanded 6 -> 10** - `general` slimmed to a multi-step implementation executor; four specialist subagents added:
  - `researcher` - external docs/library research with cited findings (perplexity MCP + Context7)
  - `tester` - writes/runs test suites, iterates failures in isolation
  - `reviewer` - diff review vs repo standards, spec, and security baseline (read-only)
  - `docs` - creates and improves documentation in `docs/`
- **Delegation rewired everywhere** - triage/handoff references in `code`, `debug`, `ask`, `plan` agents, `rules/delegation.md`, root `AGENTS.md` parallel patterns now route to specialists.
- **Docs resynced** - README counts/tables/workflows, `docs/SKILLS.md` (full rewrite), `docs/AGENTS.md` (10 agents, protocol ownership moved to specialists), `docs/STRUCTURE.md`.

### Fixed
- **Dangling sub-skill references removed** - `executing-plans` and `writing-plans` referenced deleted superpowers sub-skills (`using-git-worktrees`, `finishing-a-development-branch`, `subagent-driven-development`); replaced with inline instructions.
- **`skill-reminder` rule referenced nonexistent `kilo-config` skill** - row removed.
## [0.3.0] — 2026-08-23

### Changed
- **Agent roster consolidated 12 → 6** — built on Kilo's built-in agent names only: `code`, `debug`, `ask`, `plan` (primary) + `general`, `explore` (subagents). Specialist disciplines merged into built-in prompts instead of separate agents:
  - `tester` + `security` + `librarian` + `documentarian` protocols → folded into `general`
  - `auditor` (three-lens review) + `designer` (UI/UX, WCAG 2.2 AA) protocols → folded into `code`
- **`planner` renamed to `plan`** — matches Kilo Code's built-in plan agent.
- **Plan files moved to `.kilo/plans/`** — matches Kilo's native plan-agent write scope; `plan.md` ships restrictive frontmatter (edit: `.kilo/plans/*` allow, rest ask; read-only bash allowlist; MCP allowed), so plans stay editable without permission prompts.
- **`rules/delegation.md` rewritten** for the 6-agent roster (`general`, `explore` only).
- **Docs resynced** — README counts/tables/examples, `docs/AGENTS.md` (full rewrite: 6 agents, updated protocol ownership), `docs/STRUCTURE.md`, `docs/RULES.md`, `docs/CONFIGURATION.md`, and root `AGENTS.md` parallel-delegation patterns now reference only existing agents.

### Removed
- **6 custom agents deleted**: `agents/tester.md`, `agents/security.md`, `agents/auditor.md`, `agents/librarian.md`, `agents/documentarian.md`, `agents/designer.md`.

## [0.2.8] — 2026-08-11

### Changed
- **`/update-pack` now pulls from GitHub** — user just types `/update-pack`, the agent pulls latest changes, syncs folders, registers new rules, and reports what changed (or "already up-to-date"). No manual `git pull` needed.
- **`/install-pack` removed** — first-time install is manual CLI (deterministic, no AI dependency). Commands: clone + copy `command/` + run `/install-pack` → handled by agent. Removed to simplify the command set to a single `/update-pack`.

## [0.2.7] — 2026-08-11

### Changed
- **`/sync-pack` renamed to `/update`** — simpler, more intuitive name. `command/sync-pack.md` → `command/update.md`; all docs updated.
- **Graphify automation replaces user activation** — `rules/graphify.md` rewritten: agents auto-init (`graphify update .`) when a task needs codebase understanding and the graph is missing, auto-query when it exists, auto-refresh after code changes. No more asking the user to run `/graphify`. `AGENTS.md` Step 3 and `planner` aligned; `docs/RULES.md` updated.

### Removed
- **`/graphify` command** — `command/graphify.md` deleted. The `graphify` skill already appears as a slash entry, so the wrapper command only duplicated the menu item and invited wrong picks. The skill remains the single entry point; agent graphify protocols (code, planner, auditor, explore) are unchanged. Docs and install verification updated.

## [0.2.6] — 2026-08-11

### Changed
- **Recommended clone path unified** — README and INSTALL.md now recommend cloning directly into `~/.config/kilo/oh-my-kilo` (same directory as the config), with a note that commands detect the repo automatically if cloned elsewhere.

## [0.2.5] — 2026-08-11

### Changed
- **Repo locator for `/install-pack` and `/sync-pack`** — the user may clone the repo anywhere, so both commands now find it via an ordered strategy: explicit argument → marker file `~/.config/kilo/.pack-repo` (written on every install/sync) → active open file / working directory → well-known locations → fallback (clone for install, ask user for sync). Every candidate is validated by matching the `origin` remote URL.

## [0.2.4] — 2026-08-11

### Added
- **`/install-pack` command** — `command/install-pack.md`: AI-assisted alternative to manual install. Clones the repo if missing, backs up existing config to `kilo.backup-<timestamp>`, copies pack folders (`agents/`, `command/`, `rules/`, `skills/`, `AGENTS.md`), registers all rules in `kilo.jsonc` `instructions`, sets `skills.paths`, and verifies. Manual Quick Start steps in README/INSTALL.md are kept as the canonical path.

## [0.2.3] — 2026-08-11

### Added
- **`/sync-pack` command** — `command/sync-pack.md`: copies pack folders (`agents/`, `command/`, `rules/`, `skills/`, `AGENTS.md`) into `~/.config/kilo`, registers every file in `rules/` into the `kilo.jsonc` `instructions` array, and verifies `skills.paths`. Never touches other `kilo.jsonc` keys or user customizations.

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
