---
name: web-perf
description: Deep Core Web Vitals and page speed audit using Chrome DevTools MCP. Measures LCP, INP, CLS, FCP, TTFB, TBT, Speed Index. Identifies render-blocking resources, network chains, layout shifts, caching issues, accessibility gaps. Use for performance audit, optimization, Lighthouse scores, site speed. Biases towards retrieval from current docs.
---

# Web Performance Audit

Unified skill combining audit-speed thresholds with Chrome DevTools MCP workflows.

## Core Web Vitals Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | < 2.5s | 2.5s - 4.0s | > 4.0s |
| CLS | < 0.1 | 0.1 - 0.25 | > 0.25 |
| INP | < 200ms | 200ms - 500ms | > 500ms |
| FCP | < 1.8s | 1.8s - 3.0s | > 3.0s |
| TTFB | < 800ms | 800ms - 1800ms | > 1800ms |
| TBT | < 200ms | 200ms - 600ms | > 600ms |
| Speed Index | < 3.4s | 3.4s - 5.8s | > 5.8s |

## Retrieval Sources

| Source | URL | Use for |
|--------|-----|---------|
| web.dev | https://web.dev/articles/vitals | CWV thresholds, definitions |
| Chrome DevTools | https://developer.chrome.com/docs/devtools/performance | Tooling APIs, trace analysis |
| Lighthouse | https://developer.chrome.com/docs/lighthouse/performance/performance-scoring | Score weights, metric thresholds |

## MCP Setup Required

Add to your MCP config:
```json
"chrome-devtools": {
  "type": "local",
  "command": ["npx", "-y", "chrome-devtools-mcp@latest"]
}
```

## Workflow

### Phase 1: Performance Trace
```
navigate_page(url: "<target-url>")
performance_start_trace(autoStop: true, reload: true)
```

### Phase 2: Core Web Vitals Analysis
Use `performance_analyze_insight` with these insight names:
| Metric | Insight Name | What to Look For |
|--------|--------------|------------------|
| LCP | LCPBreakdown | TTFB, resource load, render delay breakdown |
| CLS | CLSCulprits | Elements causing shifts (no dims, font swap, injected) |
| INP | INPBreakdown | Main thread blocking, long tasks, event handlers |
| Render Blocking | RenderBlocking | CSS/JS blocking first paint |
| Network Dependencies | NetworkRequestsDepGraph | Request chains delaying critical resources |

### Phase 3: Network Analysis
```
list_network_requests(resourceTypes: ["Script", "Stylesheet", "Document", "Font", "Image"])
```
Look for:
1. Render-blocking resources in `<head>` without async/defer
2. Network chains (late-discovered resources)
3. Missing preloads (critical fonts, hero images, key scripts)
4. Caching issues (missing/weak Cache-Control, ETag)
5. Large payloads (uncompressed/oversized bundles)
6. Unused preconnects (zero requests to that origin)

### Phase 4: Accessibility Snapshot
```
take_snapshot(verbose: true)
```
Flag: missing/duplicate ARIA IDs, poor contrast (WCAG AA: 4.5:1), focus traps, missing accessible names

### Phase 5: Codebase Analysis (if access)
Detect framework/bundler:
| Tool | Config Files |
|------|--------------|
| Webpack | webpack.config.js, webpack.*.js |
| Vite | vite.config.js, vite.config.ts |
| Next.js | next.config.js, next.config.mjs |
| Nuxt | nuxt.config.js, nuxt.config.ts |
| Astro | astro.config.mjs |

Check for:
- Tree-shaking config (Webpack: sideEffects, usedExports; Vite/Rollup: default on)
- Unused CSS/JS (Tailwind content config, PurgeCSS, dynamic imports)
- Polyfills (@babel/preset-env targets, core-js size)
- Compression (terser/esbuild/swc, gzip/brotli, source maps in prod)

## LCP Root-Cause Tree

**TTFB slow (>800ms)?** → Server: hosting, CDN, DB queries, SSR time → Fix: upgrade hosting, CDN, optimize server, enable caching

**LCP element is image?** → Image: format (WebP/AVIF), size (responsive), lazy loading (NO on LCP) → Fix: modern formats, width/height, fetchpriority="high", preload

**LCP element is text?** → Font: custom fonts blocking, file size, font-display → Fix: font-display: swap/optional, preload critical, subset

**Render-blocking CSS/JS?** → Large CSS in `<head>`, sync JS before content → Fix: inline critical CSS, defer non-critical, async/defer JS

## CLS Root-Cause Tree

**Images/videos lack dimensions?** → Fix: width/height attributes, CSS aspect-ratio

**Ads/embeds inject content?** → Fix: reserve space with min-height, contain-intrinsic-size

**Fonts cause reflow?** → Fix: font-display: optional, or match fallback metrics

**Dynamic content inserts above fold?** → Fix: use overlays, reserve space with fixed-height containers

## INP Root-Cause Tree

**Main thread blocked by long tasks?** → JS execution, third-party, large DOM → Fix: break tasks with requestIdleCallback/setTimeout, code-split

**Event handlers do heavy sync work?** → Click handlers with large DOM updates, validation on keystroke → Fix: debounce, requestAnimationFrame, web workers

**Third-party scripts competing?** → Analytics, chat, A/B testing, social embeds → Fix: defer until after interaction, loading="lazy", remove low-value

## Resource Analysis Table

| Resource Type | Size | Assessment | Action |
|---|---|---|---|
| HTML | [x] KB | [ok/large] | Compress, reduce inline |
| CSS | [x] KB | [ok/large] | Remove unused, minify, critical CSS |
| JavaScript | [x] KB | [ok/large] | Code-split, tree-shake, defer |
| Images | [x] KB | [ok/large] | Modern formats, responsive, lazy load |
| Fonts | [x] KB | [ok/large] | Subset, limit families/weights, preload |
| Third-party | [x] KB | [ok/large] | Audit necessity, defer, self-host |

Benchmarks: Total < 1.5MB, JS < 300KB (gz), CSS < 100KB (gz), Fonts < 100KB

## Output Format

### Speed Audit: [URL/domain]

**Core Web Vitals**

| Metric | Value | Rating | Root Cause |
|--------|-------|--------|------------|
| LCP | [value] | Good/Needs/Poor | [cause] |
| CLS | [value] | ... | ... |
| INP | [value] | ... | ... |
| FCP | [value] | ... | ... |
| TTFB | [value] | ... | ... |

**Resource Breakdown** [table above]

**Priority Fixes** (ordered by impact)
1. **[Metric]: [Root cause]**
   - Current: [value]
   - Target: [threshold]
   - Fix: [specific action]
   - Estimated impact: [high/medium/low]

**Quick Wins**
- [ ] Add width/height to images
- [ ] Set fetchpriority="high" on LCP image
- [ ] Defer non-critical JavaScript
- [ ] ...

## Pro Tips
- CWV Impact Calculator: https://seojuice.com/tools/cwv-impact/
- Critical CSS Generator: https://seojuice.com/tools/critical-css-generator/