# Configuration Reference

This document explains the `kilo.jsonc` blocks that work with this pack. The pack ships **no config template** — real `kilo.jsonc` is machine-specific and gitignored. Copy the blocks you need into your `~/.config/kilo/kilo.jsonc` and edit to customize.

## `permission` — Opinionated Default

A permissive `permission` block (all tools allowed) is recommended for a smooth start. **Review before trusting** — tighten for production use:

```jsonc
"permission": {
  "bash": "allow",
  "external_directory": "allow",
  "read": { "*": "allow" },
  "edit": "allow",
  "glob": "allow",
  "grep": "allow",
  "list": "allow",
  "task": "allow",
  "skill": "allow",
  "websearch": "allow",
  "lsp": "allow",
  "todoread": "allow",
  "todowrite": "allow",
  "webfetch": "allow",
  "kilo_memory_recall": { "*": "allow" },
  "kilo_memory_save": "allow"
}
```

To restrict, change `"allow"` to `"deny"` per tool or add specific glob patterns.

## `provider` — Any OpenAI-Compatible Endpoint

The pack is provider-agnostic: point it at **any OpenAI-compatible endpoint** — OpenRouter, Together, a local proxy (e.g. LM Studio, vLLM), or your own router. Add a provider block per endpoint:

```jsonc
"provider": {
  "my-provider": {
    "name": "My Provider",
    "npm": "@ai-sdk/openai-compatible",
    "options": {
      "baseURL": "{env:OPENAI_BASE_URL}",
      "apiKey": "{env:OPENAI_API_KEY}"
    },
    "models": { ... }
  }
}
```

Required env vars (in `.env` or shell):
- `OPENAI_BASE_URL` — e.g., `https://api.example.com/v1`
- `OPENAI_API_KEY` — your API key (omit if the endpoint needs none)

Set `models` to the model IDs your endpoint exposes; then reference them as `<provider>/<model>`, e.g. `my-provider/gpt-5.6-sol`.

## `mcp` — Register Servers in `kilo.jsonc`

MCP servers are configured in the `"mcp"` block of your `kilo.jsonc`. The servers themselves run as `npx` processes on demand — the block is the whole setup.

### Required

| MCP | Type | Description |
|-----|------|-------------|
| `agentmemory` | local | Persistent cross-session memory. Install the server from the README prerequisites, then register it: `npx -y @agentmemory/mcp` + `AGENTMEMORY_URL=http://localhost:3111` (via the `environment` key) |

```jsonc
"mcp": {
  "agentmemory": {
    "type": "local",
    "command": ["npx", "-y", "@agentmemory/mcp"],
    "environment": { "AGENTMEMORY_URL": "http://localhost:3111" }
  }
}
```

### Highly Recommended (credential-free)

| MCP | Type | Description |
|-----|------|-------------|
| `chrome-devtools` | local | Live browser control — snapshots, console, network, performance traces, Lighthouse |
| `playwright` | local | Browser automation for testing and scraping (first run may need `npx playwright install chromium`) |
| `cloudflare` | local | Cloudflare platform bindings — `npx mcp-remote https://bindings.mcp.cloudflare.com/sse` |

### Recommended (needs a free API key)

| MCP | Type | Description |
|-----|------|-------------|
| `context7` | remote | Up-to-date library docs for any package — free key from context7.com |

```jsonc
"mcp": {
  "context7": {
    "type": "remote",
    "url": "https://mcp.context7.com/mcp",
    "headers": { "Authorization": "{env:CTX7_API_KEY}" }
  },
  "chrome-devtools": {
    "type": "local",
    "command": ["npx", "-y", "chrome-devtools-mcp@latest"]
  },
  "playwright": {
    "type": "local",
    "command": ["npx", "-y", "@playwright/mcp@latest"]
  }
}
```

### Not Bundled (add with your own credentials)

| MCP | Reason |
|-----|--------|
| `supabase` | Requires an access token |
| `perplexity` | Requires an API key |
| `tinypuppet` | Requires a local browser-automation install |

Example for adding a credential-bearing MCP back, using `{env:...}` placeholders:

```jsonc
"mcp": {
  "supabase": {
    "type": "local",
    "command": ["npx", "-y", "@supabase/mcp-server-supabase@0.9.0", "--access-token", "{env:SUPABASE_TOKEN}"]
  }
}
```

Set `CTX7_API_KEY`, `SUPABASE_TOKEN` in your `.env` or shell. `{env:VAR}` resolves **only in trusted global config** (`~/.config/kilo/`, `KILO_CONFIG`, `KILO_CONFIG_CONTENT`).

## `indexing` — Excluded

The `indexing` block (embedding provider + API key) is excluded from the pack. To re-enable:

```jsonc
"indexing": {
  "enabled": true,
  "provider": "openai-compatible",
  "model": "openrouter/qwen/qwen3-embedding-8b",
  "openai-compatible": {
    "baseUrl": "{env:EMBEDDING_BASE_URL}",
    "apiKey": "{env:EMBEDDING_API_KEY}"
  },
  "dimension": 512
}
```

## `agent` — System Prompts in `agents/*.md`

The pack **omits the `agent` block entirely**. System prompts live in `agents/*.md` files.

**Model, variant, and temperature per agent** are set by the user via **Kilo Settings** (extension UI or `kilo settings`), which writes the `agent` block in your `kilo.jsonc`. Do NOT put these in the agent frontmatter. The one exception: restrictive `permission:` blocks in the frontmatter ARE honored at runtime and ship on the restricted agents (`plan`: plan-file writes in `.kilo/plans/` only + read-only bash; `ask`: read-only).

To override per-agent models after install, edit your `kilo.jsonc` (replace `<provider>` with the provider you configured):

```jsonc
"agent": {
  "code": { "model": "<provider>/gpt-5.6-sol" },
  "ask": { "model": "<provider>/claude-opus-4-8" }
}
```

## `model` / `small_model` — User-Chosen

Effective defaults are set by the user via Kilo Settings. Commented examples:

```jsonc
// "model": "<provider>/gpt-5.6-sol",
// "small_model": "<provider>/claude-opus-4-8",
```

## Other Keys

| Key | Value | Notes |
|-----|-------|-------|
| `disabled_providers` | `["kilo"]` | Disable built-in kilo provider |
| `share` | `"auto"` | Share analytics |
| `experimental` | `{ "batch_tool": true, "codebase_search": true, "image_generation": false }` | Feature flags |
| `web_search` | `true` | Enable web search |
| `instructions` | `["rules/agentmemory.md", ...]` | Rule files to load at session start. **Not auto-loaded from the `rules/` folder** — each rule file must be listed here (or added via Settings → Agent Behaviour → Rules → Add Additional Instruction Files). The pack ships 7 rules: `agentmemory.md`, `graphify.md`, `skill-reminder.md`, `delegation.md`, `workers.md`, `language.md`, `communication-style.md`. **List the two protocol rules (`agentmemory`, `graphify`) first** — earliest entries land earliest in context and get better compliance. |
| `plugin` | `["file:///C:/Users/<YourUser>/.config/kilo/plugins/graphify.js"]` | Registers the enforcement plugin. Must be in the **global** config — a project-level `.kilo/kilo.json` registration only loads when Kilo runs from that directory. See [INSTALL.md Step 5](INSTALL.md#5-register-the-enforcement-plugin). |
| `skills.paths` | `["C:\\Users\\<YourUser>\\.config\\kilo\\skills"]` | Where the copied `skills/` folder lives. Also settable via Settings → Agent Behaviour → Skills. Without it, Kilo looks in `%USERPROFILE%\.kilo\skills\` by default. |

## `{env:VAR}` Resolution

- **Works**: Global config (`~/.config/kilo/kilo.jsonc`), `KILO_CONFIG`, `KILO_CONFIG_CONTENT`
- **Does NOT work**: Project-level `.kilo/kilo.jsonc` (untrusted)
- If you install to a project config, `{env:VAR}` will not resolve.

See `SECURITY.md` for the threat model.
