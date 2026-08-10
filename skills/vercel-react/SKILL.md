---
name: vercel-react
description: React/Next.js performance optimization + composition patterns from Vercel Engineering. Covers 70+ rules: eliminating waterfalls, bundle optimization, server performance, re-render optimization, rendering performance, JS performance, advanced patterns, plus compound components, state management, React 19 APIs. Use for writing, reviewing, refactoring React/Next.js code.
---

# Vercel React Best Practices + Composition Patterns

Unified skill combining performance rules (70+) with composition architecture patterns.

## When to Apply

- Writing new React components or Next.js pages
- Implementing data fetching (client/server)
- Reviewing code for performance issues
- Refactoring existing React/Next.js code
- Optimizing bundle size or load times
- Designing component APIs (avoid boolean prop proliferation)
- Building reusable component libraries

---

## PART 1: PERFORMANCE RULES (Priority Order)

### 1. Eliminating Waterfalls (CRITICAL)

| Rule | Description |
|------|-------------|
| `async-cheap-condition-before-await` | Check cheap sync conditions before awaiting flags |
| `async-defer-await` | Move await into branches where actually used |
| `async-parallel` | Use Promise.all() for independent operations |
| `async-dependencies` | Use better-all for partial dependencies |
| `async-api-routes` | Start promises early, await late in API routes |
| `async-suspense-boundaries` | Use Suspense to stream content |

**Key pattern:** Start promises before awaiting, use `Promise.all()` or `better-all` for parallelism.

### 2. Bundle Size Optimization (CRITICAL)

| Rule | Description |
|------|-------------|
| `bundle-barrel-imports` | Import directly, avoid barrel files (lucide-react, MUI, etc.) |
| `bundle-analyzable-paths` | Prefer statically analyzable import paths |
| `bundle-dynamic-imports` | Use next/dynamic for heavy components |
| `bundle-defer-third-party` | Load analytics/logging after hydration |
| `bundle-conditional` | Load modules only when feature activated |
| `bundle-preload` | Preload on hover/focus for perceived speed |

**Quick wins:**
```tsx
// ❌ Barrel import - loads 1500+ modules
import { Check, X } from 'lucide-react'

// ✅ Direct import (Next.js 13.5+ transforms automatically)
// ✅ Non-Next.js: import Check from 'lucide-react/dist/esm/icons/check'
```

### 3. Server-Side Performance (HIGH)

| Rule | Description |
|------|-------------|
| `server-auth-actions` | Authenticate inside Server Actions (not just middleware) |
| `server-cache-react` | Use React.cache() for per-request deduplication |
| `server-cache-lru` | Use LRU cache for cross-request caching |
| `server-dedup-props` | Avoid duplicate serialization in RSC props |
| `server-hoist-static-io` | Hoist static I/O (fonts, logos) to module level |
| `server-no-shared-module-state` | No mutable module-level request state |
| `server-serialization` | Minimize data passed to client components |
| `server-parallel-fetching` | Restructure components to parallelize fetches |
| `server-parallel-nested-fetching` | Chain nested fetches per item in Promise.all |
| `server-after-nonblocking` | Use after() for non-blocking operations |

### 4. Client-Side Data Fetching (MEDIUM-HIGH)

| Rule | Description |
|------|-------------|
| `client-swr-dedup` | Use SWR for automatic request deduplication |
| `client-event-listeners` | Deduplicate global event listeners |
| `client-passive-event-listeners` | Use passive: true for scroll/touch |
| `client-localstorage-schema` | Version and minimize localStorage data |

### 5. Re-render Optimization (MEDIUM)

| Rule | Description |
|------|-------------|
| `rerender-defer-reads` | Don't subscribe to state only used in callbacks |
| `rerender-memo` | Extract expensive work into memoized components |
| `rerender-memo-with-default-value` | Hoist default non-primitive props to constants |
| `rerender-dependencies` | Use primitive dependencies in effects |
| `rerender-derived-state` | Subscribe to derived booleans, not raw values |
| `rerender-derived-state-no-effect` | Derive state during render, not effects |
| `rerender-functional-setstate` | Use functional setState for stable callbacks |
| `rerender-lazy-state-init` | Pass function to useState for expensive values |
| `rerender-simple-expression-in-memo` | Avoid memo for simple primitives |
| `rerender-split-combined-hooks` | Split hooks with independent dependencies |
| `rerender-move-effect-to-event` | Put interaction logic in event handlers |
| `rerender-transitions` | Use startTransition for non-urgent updates |
| `rerender-use-deferred-value` | Defer expensive renders to keep input responsive |
| `rerender-use-ref-transient-values` | Use refs for transient frequent values |
| `rerender-no-inline-components` | Don't define components inside components |

### 6. Rendering Performance (MEDIUM)

| Rule | Description |
|------|-------------|
| `rendering-animate-svg-wrapper` | Animate div wrapper, not SVG element |
| `rendering-content-visibility` | Use content-visibility for long lists |
| `rendering-hoist-jsx` | Extract static JSX outside components |
| `rendering-svg-precision` | Reduce SVG coordinate precision |
| `rendering-hydration-no-flicker` | Use inline script for client-only data |
| `rendering-hydration-suppress-warning` | Suppress expected mismatches |
| `rendering-activity` | Use Activity component for show/hide |
| `rendering-conditional-render` | Use ternary, not && for conditionals |
| `rendering-usetransition-loading` | Prefer useTransition for loading state |
| `rendering-resource-hints` | Use React DOM resource hints for preloading |
| `rendering-script-defer-async` | Use defer/async on script tags |

### 7. JavaScript Performance (LOW-MEDIUM)

| Rule | Description |
|------|-------------|
| `js-batch-dom-css` | Group CSS changes via classes or cssText |
| `js-index-maps` | Build Map for repeated lookups |
| `js-cache-property-access` | Cache object properties in loops |
| `js-cache-function-results` | Cache function results in module-level Map |
| `js-cache-storage` | Cache localStorage/sessionStorage reads |
| `js-combine-iterations` | Combine multiple filter/map into one loop |
| `js-length-check-first` | Check array length before expensive comparison |
| `js-early-exit` | Return early from functions |
| `js-hoist-regexp` | Hoist RegExp creation outside loops |
| `js-min-max-loop` | Use loop for min/max instead of sort |
| `js-set-map-lookups` | Use Set/Map for O(1) lookups |
| `js-tosorted-immutable` | Use toSorted() for immutability |
| `js-flatmap-filter` | Use flatMap to map and filter in one pass |
| `js-request-idle-callback` | Defer non-critical work to browser idle time |

### 8. Advanced Patterns (LOW)

| Rule | Description |
|------|-------------|
| `advanced-effect-event-deps` | Don't put useEffectEvent results in effect deps |
| `advanced-event-handler-refs` | Store event handlers in refs |
| `advanced-init-once` | Initialize app once per app load |
| `advanced-use-latest` | useLatest for stable callback refs |

---

## PART 2: COMPOSITION PATTERNS

### 1. Component Architecture (HIGH)

#### Avoid Boolean Prop Proliferation
```tsx
// ❌ Boolean props create exponential complexity
function Composer({ isThread, isDMThread, isEditing, isForwarding }) { }

// ✅ Explicit variants with composition
function ThreadComposer({ channelId }) { }
function EditComposer() { }
function ForwardMessageComposer() { }
```

#### Use Compound Components
```tsx
// Shared context, not props
const ComposerContext = createContext<ComposerContextValue | null>(null)

function ComposerProvider({ children, state, actions, meta }) {
  return <ComposerContext value={{ state, actions, meta }}>{children}</ComposerContext>
}

// UI components compose what they need
<Composer.Provider state={state} actions={actions} meta={meta}>
  <Composer.Frame>
    <Composer.Header />
    <Composer.Input />
    <Composer.Footer>
      <Composer.Formatting />
      <Composer.Submit />
    </Composer.Footer>
  </Composer.Frame>
</Composer.Provider>
```

### 2. State Management (MEDIUM)

#### Decouple State from UI
```tsx
// Provider handles state implementation
function ChannelProvider({ channelId, children }) {
  const { state, update, submit } = useGlobalChannel(channelId)
  return (
    <Composer.Provider state={state} actions={{ update, submit }}>
      {children}
    </Composer.Provider>
  )
}

// UI only knows context interface
function ChannelComposer() {
  return <Composer.Frame>...</Composer.Frame>
}
```

#### Generic Context Interface (Dependency Injection)
```tsx
interface ComposerState { input: string; attachments: Attachment[] }
interface ComposerActions { update: (s) => void; submit: () => void }
interface ComposerMeta { inputRef: React.RefObject<TextInput> }
interface ComposerContextValue { state: ComposerState; actions: ComposerActions; meta: ComposerMeta }

const ComposerContext = createContext<ComposerContextValue | null>(null)
```

#### Lift State to Provider
```tsx
function ForwardMessageProvider({ children }) {
  const [state, setState] = useState(initialState)
  return (
    <Composer.Provider state={state} actions={{ update: setState, submit: forwardMessage }}>
      {children}
    </Composer.Provider>
  )
}

// Custom components OUTSIDE composer can access state
function ForwardButton() {
  const { actions: { submit } } = use(ComposerContext)
  return <Button onPress={submit}>Forward</Button>
}
```

### 3. Implementation Patterns (MEDIUM)

#### Create Explicit Variants
```tsx
function ThreadComposer({ channelId }) {
  return (
    <ThreadProvider channelId={channelId}>
      <Composer.Frame>
        <Composer.Input />
        <AlsoSendToChannelField channelId={channelId} />
        <Composer.Footer>...</Composer.Footer>
      </Composer.Frame>
    </ThreadProvider>
  )
}
```

#### Prefer Children Over Render Props
```tsx
// ✅ Children - flexible, readable
<Composer.Frame>
  <CustomHeader />
  <Composer.Input />
  <Composer.Footer>
    <Composer.Formatting />
    <Composer.Submit />
  </Composer.Footer>
</Composer.Frame>

// ❌ Render props - awkward, inflexible
<Composer renderHeader={() => <CustomHeader />} renderFooter={...} />
```

### 4. React 19 APIs (MEDIUM)

```tsx
// ❌ forwardRef not needed in React 19
const ComposerInput = forwardRef((props, ref) => <TextInput ref={ref} {...props} />)

// ✅ ref as regular prop
function ComposerInput({ ref, ...props }) {
  return <TextInput ref={ref} {...props} />
}

// ❌ useContext
const value = useContext(MyContext)

// ✅ use() - can be called conditionally
const value = use(MyContext)
```

---

## QUICK REFERENCE: TOP 10 IMPACT RULES

1. **async-parallel** - Promise.all() for independent ops (2-10×)
2. **bundle-barrel-imports** - Direct imports (15-70% faster dev, 40% faster cold starts)
3. **server-parallel-fetching** - Component composition for parallel data (CRITICAL)
4. **server-parallel-nested-fetching** - Chain per-item in Promise.all (CRITICAL)
5. **rerender-no-inline-components** - Prevents remount, lost state (HIGH)
6. **rerender-derived-state-no-effect** - Derive during render, not effects (MEDIUM)
7. **architecture-avoid-boolean-props** - Composition over conditionals (HIGH)
8. **state-lift-state** - Provider enables external access (HIGH)
9. **rendering-conditional-render** - Ternary over && prevents bugs (MEDIUM)
10. **client-swr-dedup** - Automatic deduplication (MEDIUM-HIGH)

---

## HOW TO USE

For detailed explanations and code examples, reference individual rule files:
```
rules/async-parallel.md
rules/bundle-barrel-imports.md
rules/architecture-avoid-boolean-props.md
rules/state-context-interface.md
```

Full compiled document: `AGENTS.md`