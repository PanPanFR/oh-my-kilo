---
name: ui-design
description: UI/UX design intelligence for web and mobile. Trigger with "design UI", "create component", "build landing page", "build dashboard", "choose color", "pick font", "check accessibility", "review UX", "add animation", "responsive design", "dark mode", or when designing new pages, creating UI components, choosing color schemes or typography, reviewing UI code for UX/accessibility, or implementing navigation, animations, or responsive behavior.
---

# UI Design

Comprehensive design guidance for web and mobile applications.

## When to Apply

### Must Use

- Designing new pages (Landing Page, Dashboard, Admin, SaaS, Mobile App)
- Creating or refactoring UI components (buttons, modals, forms, tables, charts, etc.)
- Choosing color schemes, typography systems, spacing standards, or layout systems
- Reviewing UI code for user experience, accessibility, or visual consistency
- Implementing navigation structures, animations, or responsive behavior
- Making product-level design decisions (style, information hierarchy, brand expression)
- Improving perceived quality, clarity, or usability of interfaces

### Skip

- Pure backend logic development
- Only involving API or database design
- Performance optimization unrelated to the interface
- Infrastructure or DevOps work
- Non-visual scripts or automation tasks

**Decision criteria**: If the task will change how a feature **looks, feels, moves, or is interacted with**, this skill should be used.

## Design Principles

### Ground it in the subject

Pin down what the product or subject is: name one concrete subject, its audience, and the page's single job. The subject's own world, its materials, instruments, artifacts, and vernacular, is where distinctive choices come from.

### Typography carries personality

Pair the display and body faces deliberately. Set a clear type scale with intentional weights, widths, and spacing. Make the type treatment itself a memorable part of the design.

### Structure is information

Structural devices, numbering, eyebrows, dividers, labels, should encode something true about the content, not decorate it.

### Leverage motion deliberately

Think about where and if animation can serve the subject. An orchestrated moment usually lands harder than scattered effects.

### Restraint and self-critique

Spend your boldness in one place. Let the signature element be the one memorable thing, keep everything around it quiet and disciplined.

## Priority Rules

### 1. Accessibility (CRITICAL)

- **Color contrast**: Minimum 4.5:1 ratio for normal text (large text 3:1)
- **Focus states**: Visible focus rings on interactive elements (2–4px)
- **Alt text**: Descriptive alt text for meaningful images
- **ARIA labels**: aria-label for icon-only buttons
- **Keyboard nav**: Tab order matches visual order; full keyboard support
- **Form labels**: Use label with for attribute
- **Heading hierarchy**: Sequential h1→h6, no level skip
- **Color-not-only**: Don't convey info by color alone (add icon/text)
- **Reduced motion**: Respect prefers-reduced-motion

### 2. Touch & Interaction (CRITICAL)

- **Touch target size**: Min 44×44pt (iOS) / 48×48dp (Android)
- **Touch spacing**: Minimum 8px gap between touch targets
- **Hover vs tap**: Use click/tap for primary interactions; don't rely on hover alone
- **Loading buttons**: Disable button during async operations; show spinner or progress
- **Error feedback**: Clear error messages near problem
- **Gesture conflicts**: Avoid horizontal swipe on main content; prefer vertical scroll

### 3. Performance (HIGH)

- **Image optimization**: Use WebP/AVIF, responsive images, lazy load non-critical assets
- **Image dimensions**: Declare width/height or use aspect-ratio to prevent layout shift
- **Font loading**: Use font-display: swap; avoid FOIT
- **Critical CSS**: Prioritize above-the-fold CSS
- **Lazy loading**: Lazy load non-hero components
- **Bundle splitting**: Split code by route/feature
- **Reduce reflows**: Avoid frequent layout reads/writes; batch DOM operations

### 4. Style Selection (HIGH)

- Match style to product type
- Use same style across all pages
- Use SVG icons, not emojis
- Choose palette from product/industry
- Align shadows, blur, radius with chosen style
- Respect platform idioms (iOS HIG vs Material Design)

### 5. Layout & Responsive (HIGH)

- **Viewport meta**: width=device-width initial-scale=1 (never disable zoom)
- **Mobile-first**: Design mobile-first, then scale up
- **Breakpoint consistency**: Use systematic breakpoints (e.g. 375 / 768 / 1024 / 1440)
- **Readable font size**: Minimum 16px body text on mobile
- **Line length**: Mobile 35–60 chars per line; desktop 60–75 chars
- **No horizontal scroll**: Ensure content fits viewport width
- **Spacing scale**: Use 4pt/8dp incremental spacing system
- **Container width**: Consistent max-width on desktop

### 6. Typography & Color (MEDIUM)

- **Line height**: Use 1.5-1.75 for body text
- **Line length**: Limit to 65-75 characters per line
- **Font pairing**: Match heading/body font personalities
- **Font scale**: Consistent type scale (e.g. 12 14 16 18 24 32)
- **Semantic color tokens**: Define primary, secondary, error, surface, on-surface
- **Dark mode**: Use desaturated / lighter tonal variants, not inverted colors

### 7. Animation (MEDIUM)

- **Duration**: Use 150–300ms for micro-interactions; complex transitions ≤400ms
- **Transform performance**: Use transform/opacity only; avoid animating width/height/top/left
- **Loading states**: Show skeleton or progress indicator when loading exceeds 300ms
- **Easing**: Use ease-out for entering, ease-in for exiting
- **Motion meaning**: Every animation must express a cause-effect relationship

### 8. Forms & Feedback (MEDIUM)

- **Input labels**: Visible label per input (not placeholder-only)
- **Error placement**: Show error below the related field
- **Submit feedback**: Loading then success/error state on submit
- **Required indicators**: Mark required fields
- **Empty states**: Helpful message and action when no content
- **Toast dismiss**: Auto-dismiss toasts in 3-5s
- **Confirmation dialogs**: Confirm before destructive actions
- **Inline validation**: Validate on blur (not keystroke)
- **Input type keyboard**: Use semantic input types to trigger correct mobile keyboard

### 9. Navigation Patterns (HIGH)

- **Bottom nav limit**: Max 5 items; use labels with icons
- **Drawer usage**: Use drawer/sidebar for secondary navigation, not primary actions
- **Back behavior**: Back navigation must be predictable and consistent
- **Deep linking**: All key screens must be reachable via deep link / URL
- **Modal escape**: Modals and sheets must offer a clear close/dismiss affordance
- **Search accessible**: Search must be easily reachable
- **State preservation**: Navigating back must restore previous scroll position, filter state, and input

### 10. Charts & Data (LOW)

- **Chart type**: Match chart type to data type (trend → line, comparison → bar, proportion → pie/donut)
- **Color guidance**: Use accessible color palettes; avoid red/green only pairs for colorblind users
- **Data table**: Provide table alternative for accessibility
- **Legend visible**: Always show legend; position near the chart
- **Tooltip on interact**: Provide tooltips/data labels on hover (Web) or tap (mobile)
- **Axis labels**: Label axes with units and readable scale
- **Responsive chart**: Charts must reflow or simplify on small screens
- **Empty data state**: Show meaningful empty state when no data exists

## Writing in Design

Words appear in a design for one reason: to make it easier to understand, and therefore easier to use.

- Write from the end user's side of the screen
- Use active voice as default
- Treat failure and emptiness as moments for direction, not mood
- Keep the register conversational and tuned to the brand and audience

## Pre-Delivery Checklist

### Visual Quality
- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons come from a consistent icon family and style
- [ ] Pressed-state visuals do not shift layout bounds or cause jitter
- [ ] Semantic theme tokens are used consistently

### Interaction
- [ ] All tappable elements provide clear pressed feedback
- [ ] Touch targets meet minimum size (>=44x44pt iOS, >=48x48dp Android)
- [ ] Micro-interaction timing stays in the 150-300ms range
- [ ] Disabled states are visually clear and non-interactive
- [ ] Screen reader focus order matches visual order

### Light/Dark Mode
- [ ] Primary text contrast >=4.5:1 in both light and dark mode
- [ ] Secondary text contrast >=3:1 in both light and dark mode
- [ ] Dividers/borders and interaction states are distinguishable in both modes
- [ ] Both themes are tested before delivery

### Layout
- [ ] Safe areas are respected for headers, tab bars, and bottom CTA bars
- [ ] Scroll content is not hidden behind fixed/sticky bars
- [ ] Verified on small phone, large phone, and tablet (portrait + landscape)
- [ ] 4/8dp spacing rhythm is maintained

### Accessibility
- [ ] All meaningful images/icons have accessibility labels
- [ ] Form fields have labels, hints, and clear error messages
- [ ] Color is not the only indicator
- [ ] Reduced motion and dynamic text size are supported without layout breakage
