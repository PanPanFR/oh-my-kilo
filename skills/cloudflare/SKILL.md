---
name: cloudflare
description: Unified Cloudflare platform skill: Workers, Durable Objects, Wrangler CLI, KV, D1, R2, AI, Vectorize, Queues, Workflows, Containers, Pipelines, Secrets Store, Agents SDK, Pages, security (WAF, DDoS, Turnstile), networking (Tunnel, Spectrum), IaC (Terraform, Pulumi). Use for any CF task. Retrieval-first.
---

# Cloudflare Platform Skill (Unified)

Consolidated: cloudflare + workers-best-practices + wrangler + durable-objects.

**Retrieval-first** — fetch latest docs before citing numbers, APIs, config.

## Retrieval Sources

| Source | URL | Use for |
|--------|-----|---------|
| CF Docs | https://developers.cloudflare.com/ | Limits, pricing, API reference |
| Workers types | `npm pack @cloudflare/workers-types` | Type signatures, binding shapes |
| Wrangler schema | `node_modules/wrangler/config-schema.json` | Config fields, binding shapes |
| Changelog | https://developers.cloudflare.com/changelog/ | Recent changes |
| Best Practices | https://developers.cloudflare.com/workers/best-practices/workers-best-practices/ | Canonical rules, anti-patterns |
| DO API | https://developers.cloudflare.com/durable-objects/api/ | DO methods, storage, alarms |

When reference and docs disagree, **trust the docs**.

---

## DECISION TREES

### "I need to run code"
```
├─ Serverless edge functions → Workers
├─ Full-stack with Git deploys → Pages
├─ Stateful coordination/real-time → Durable Objects
├─ Long-running multi-step → Workflows
├─ Run containers → Containers
├─ Multi-tenant (customers deploy) → Workers for Platforms
├─ Scheduled tasks (cron) → Cron Triggers
├─ Lightweight edge logic (modify HTTP) → Snippets
├─ Process execution events (logs) → Tail Workers
└─ Optimize latency to backend → Smart Placement
```

### "I need to store data"
```
├─ Key-value (config, sessions, cache) → KV
├─ Relational SQL → D1 (SQLite) or Hyperdrive (existing PG/MySQL)
├─ Object/file (S3-compatible) → R2
├─ Versioned file trees → Artifacts
├─ Message queue → Queues
├─ Vector embeddings → Vectorize
├─ Per-entity state → DO storage (SQLite)
├─ Secrets → Secrets Store
├─ Streaming ETL to R2 → Pipelines
├─ Managed Iceberg catalog → R2 Data Catalog
├─ Serverless SQL analytics → R2 SQL
└─ Persistent cache → Cache Reserve
```

### "I need AI/ML"
```
├─ Run inference (LLMs, embeddings, images) → Workers AI
├─ Vector database for RAG/search → Vectorize
├─ Build stateful AI agents → Agents SDK
├─ Gateway for any AI provider → AI Gateway
└─ AI-powered search widget → AI Search
```

### "I need security"
```
├─ WAF → WAF
├─ DDoS protection → DDoS
├─ Bot detection → Bot Management
├─ API protection → API Shield
├─ CAPTCHA alternative → Turnstile
└─ Credential leak detection → WAF (managed ruleset)
```

---

## WORKERS BEST PRACTICES

### Configuration
| Rule | Summary |
|------|---------|
| compatibility_date | Set to today on new; update periodically |
| nodejs_compat | Enable flag — many libs need Node.js built-ins |
| wrangler types | Run after config changes — never hand-write Env |
| Secrets | Use `wrangler secret put`, never hardcode |
| wrangler.jsonc | JSON config preferred; newer features JSON-only |

### Request & Response
| Rule | Summary |
|------|---------|
| Streaming | Stream large/unknown payloads — never `await response.text()` on unbounded |
| waitUntil | Use `ctx.waitUntil()` for post-response work; don't destructure ctx |

### Architecture
| Rule | Summary |
|------|---------|
| Bindings over REST | Use in-process bindings (KV, R2, D1, Queues) not REST API |
| Queues & Workflows | Move async work off critical path |
| Service bindings | Worker-to-Worker via service bindings, not public HTTP |
| Hyperdrive | Always for external PG/MySQL connections |

### Security
| Rule | Summary |
|------|---------|
| Web Crypto | `crypto.randomUUID()` / `crypto.getRandomValues()` — never Math.random() |
| No passThroughOnException | Explicit try/catch with structured errors |

### Anti-Patterns (NEVER)
| Anti-pattern | Why |
|-------------|-----|
| `await response.text()` unbounded | Memory exhaustion (128MB limit) |
| Hardcoded secrets | Credential leak |
| `Math.random()` for tokens | Not cryptographically secure |
| Bare `fetch()` no await/waitUntil | Floating promise |
| Module-level mutable request state | Cross-request data leaks |
| REST API from Worker | Unnecessary network hop, latency |
| `ctx.passThroughOnException()` | Hides bugs |
| Hand-written Env | Drifts from wrangler config |
| Destructuring `ctx` | Loses this binding |
| `any` on Env/params | Defeats type safety |
| `as unknown as T` double-cast | Hides type incompatibilities |
| `implements` on platform classes | Use `extends` DurableObject/WorkerEntrypoint/Workflow |
| `env.X` inside platform class | Use `this.env.X` |

---

## DURABLE OBJECTS

### When to Use
| Need | Example |
|------|---------|
| Coordination | Chat rooms, multiplayer, collaborative docs |
| Strong consistency | Inventory, booking, turn-based games |
| Per-entity storage | Multi-tenant SaaS, per-user data |
| Persistent connections | WebSockets, real-time notifications |
| Scheduled per entity | Subscription renewals, game timeouts |

### When NOT to Use
- Stateless request handling (plain Workers)
- Maximum global distribution
- High fan-out independent requests

### Core Pattern
```typescript
import { DurableObject } from "cloudflare:workers";

export class MyDO extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      this.ctx.storage.sql.exec(`
        CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          data TEXT NOT NULL
        )
      `);
    });
  }

  async addItem(data: string): Promise<number> {
    const result = this.ctx.storage.sql.exec<{ id: number }>(
      "INSERT INTO items (data) VALUES (?) RETURNING id", data
    );
    return result.one().id;
  }
}
```

### Critical Rules
1. **Model around coordination atoms** — one DO per entity, not global
2. **getByName() for deterministic routing** — same input = same DO
3. **SQLite storage** — configure `new_sqlite_classes` in migrations
4. **Initialize in constructor** — blockConcurrencyWhile() for schema only
5. **RPC methods** — not fetch() handler (compat date >= 2024-04-03)
6. **Persist first, cache second** — write storage before memory
7. **One alarm per DO** — setAlarm() replaces existing

### Anti-Patterns
- Single global DO (bottleneck)
- blockConcurrencyWhile() every request (kills throughput)
- Critical state only in memory (lost on eviction)
- await between related writes (breaks atomicity)
- Holding blockConcurrencyWhile across fetch/external I/O

### Stub Creation
```typescript
const stub = env.MY_DO.getByName("room-123");  // Deterministic
const id = env.MY_DO.idFromString(storedId);     // From ID string
const stub = env.MY_DO.newUniqueId();             // New unique
```

### Storage
```typescript
// SQL (synchronous, recommended)
this.ctx.storage.sql.exec("INSERT INTO t (c) VALUES (?)", value);
const rows = this.ctx.storage.sql.exec<Row>("SELECT * FROM t").toArray();

// KV (async)
await this.ctx.storage.put("key", value);
const val = await this.ctx.storage.get<Type>("key");
```

### Alarms
```typescript
await this.ctx.storage.setAlarm(Date.now() + 60_000);
async alarm() { /* process, optionally reschedule */ }
await this.ctx.storage.deleteAlarm();
```

---

## WRANGLER CLI

### Quick Reference
| Task | Command |
|------|---------|
| Local dev | `wrangler dev` |
| Deploy | `wrangler deploy` |
| Deploy dry run | `wrangler deploy --dry-run` |
| Generate types | `wrangler types` |
| Profile startup | `wrangler check startup` |
| Live logs | `wrangler tail` |
| Delete | `wrangler delete` |
| Auth status | `wrangler whoami` |

### Config (wrangler.jsonc)
```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-worker",
  "main": "src/index.ts",
  "compatibility_date": "2026-01-01",
  "compatibility_flags": ["nodejs_compat"],
  "vars": { "ENVIRONMENT": "production" },
  "kv_namespaces": [{ "binding": "KV", "id": "<ID>" }],
  "r2_buckets": [{ "binding": "BUCKET", "bucket_name": "my-bucket" }],
  "d1_databases": [{ "binding": "DB", "database_name": "my-db", "database_id": "<ID>" }],
  "ai": { "binding": "AI" },
  "vectorize": [{ "binding": "INDEX", "index_name": "my-index" }],
  "hyperdrive": [{ "binding": "HD", "id": "<ID>" }],
  "durable_objects": { "bindings": [{ "name": "COUNTER", "class_name": "Counter" }] },
  "migrations": [{ "tag": "v1", "new_sqlite_classes": ["Counter"] }],
  "workflows": [{ "binding": "WF", "name": "my-workflow", "class_name": "MyWorkflow" }],
  "queues": {
    "producers": [{ "binding": "Q", "queue": "my-queue" }],
    "consumers": [{ "queue": "my-queue", "max_batch_size": 10 }]
  },
  "triggers": { "crons": ["0 * * * *"] },
  "observability": { "enabled": true, "head_sampling_rate": 1 },
  "env": {
    "staging": { "name": "my-worker-staging", "vars": { "ENVIRONMENT": "staging" } }
  }
}
```

### Local Dev
```bash
wrangler dev                          # Local mode (default)
wrangler dev --env staging            # Specific environment
wrangler dev --port 8787              # Custom port
wrangler dev --live-reload            # HTML live reload
wrangler dev --test-scheduled         # Test cron handlers (visit /__scheduled)
```

Remote bindings for local dev:
```jsonc
{ "r2_buckets": [{ "binding": "BUCKET", "bucket_name": "my-bucket", "remote": true }] }
```

### Deployment
```bash
wrangler deploy                       # Production
wrangler deploy --env staging         # Staging
wrangler deploy --dry-run             # Validate without deploy
wrangler deploy --keep-vars           # Keep dashboard variables
wrangler deploy --minify              # Minify code
```

### Secrets
```bash
wrangler secret put API_KEY           # Interactive (preferred)
wrangler secret put KEY < key.pem     # From file
wrangler secret list                  # List
wrangler secret delete API_KEY        # Delete
wrangler secret bulk secrets.json     # Bulk from JSON
```

### KV
```bash
wrangler kv namespace create MY_KV
wrangler kv key put --namespace-id <ID> "key" "value"
wrangler kv key get --namespace-id <ID> "key"
wrangler kv bulk put --namespace-id <ID> data.json
```

### R2
```bash
wrangler r2 bucket create my-bucket
wrangler r2 object put my-bucket/path --file ./local-file.txt
wrangler r2 object get my-bucket/path
```

### D1
```bash
wrangler d1 create my-database
wrangler d1 execute my-database --remote --command "SELECT * FROM users"
wrangler d1 execute my-database --remote --file ./schema.sql
wrangler d1 migrations create my-database create_users_table
wrangler d1 migrations apply my-database --remote
wrangler d1 export my-database --remote --output backup.sql
```

### Vectorize
```bash
wrangler vectorize create my-index --dimensions 768 --metric cosine
wrangler vectorize create my-index --preset @cf/baai/bge-base-en-v1.5
wrangler vectorize query my-index --vector "[0.1, ...]" --top-k 10
```

### Hyperdrive
```bash
wrangler hyperdrive create my-hd --origin-host db.example.com --origin-port 5432 --database mydb --origin-user user --origin-password "$PASS"
```

### Workers AI
```bash
wrangler ai models
```
Config: `{ "ai": { "binding": "AI" } }` (always remote, charges apply)

### Queues
```bash
wrangler queues create my-queue
wrangler queues consumer add my-queue my-worker
```

### Workflows
```bash
wrangler workflows list
wrangler workflows trigger my-workflow --params '{"key":"value"}'
wrangler workflows instances list my-workflow
```

### Containers
```bash
wrangler containers build -t my-app:latest . --push
wrangler containers list
wrangler containers registries list
```

### Pipelines
```bash
wrangler pipelines create my-pipeline --r2 my-bucket
wrangler pipelines show my-pipeline
```

### Secrets Store
```bash
wrangler secrets-store store create my-store
wrangler secrets-store secret put <STORE_ID> my-secret
wrangler secrets-store secret get <STORE_ID> my-secret
```

### Pages
```bash
wrangler pages project create my-site
wrangler pages deploy ./dist --branch main
```

### Observability
```bash
wrangler tail                          # Stream logs
wrangler tail --status error           # Filter by status
wrangler tail --search "error"         # Filter by term
```

### Testing (Vitest)
```bash
npm install -D @cloudflare/vitest-pool-workers vitest
```
```typescript
import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";
export default defineWorkersConfig({
  test: { poolOptions: { workers: { wrangler: { configPath: "./wrangler.jsonc" } } } }
});
```

### Troubleshooting
| Issue | Solution |
|-------|----------|
| `command not found: wrangler` | `npm install -D wrangler` |
| Auth errors | `wrangler login` |
| Startup time exceeded | `wrangler check startup` |
| Type errors after config | `wrangler types` |
| Binding undefined | Check name matches config exactly |

---

## PRODUCT INDEX

### Compute & Runtime
Workers, Pages, Durable Objects, Workflows, Containers, Workers for Platforms, Cron Triggers, Tail Workers, Snippets, Smart Placement

### Storage & Data
KV, D1, R2, Artifacts, Queues, Hyperdrive, DO Storage, Secrets Store, Pipelines, R2 Data Catalog, R2 SQL

### AI & ML
Workers AI, Vectorize, Agents SDK, AI Gateway, AI Search

### Networking
Tunnel, Spectrum, TURN, Network Interconnect, Argo Smart Routing, Workers VPC

### Security
WAF, DDoS, Bot Management, API Shield, Turnstile

### Media
Images, Stream, Browser Rendering, Zaraz

### IaC
Pulumi, Terraform, API

### Other
Email Routing, Email Workers, Static Assets, Bindings, Cache Reserve, Flagship (feature flags)