# Petavue Design System — Usage Guide

This project contains Petavue's component library and design tokens. When building any new page or feature, **always use existing components and tokens**. Never recreate what already exists.

## Stack

- **Framework:** React 19 (functional components, hooks, JSX — no TypeScript)
- **Build:** Vite
- **Styling:** Plain CSS with design tokens — no Tailwind, no styled-components, no CSS Modules
- **Charts:** Recharts
- **Icons:** Phosphor Icons (`@phosphor-icons/react`)
- **No other UI libraries** — everything is built from our Figma design system

## Getting Started

```
npm install
npm start
```

---

## CRITICAL RULES — Read Before Writing Any Code

### 1. Use Existing Components — Do NOT Rebuild

These components are already built and exported from `src/components/index.js`:

| Component | Import | Use For |
|---|---|---|
| `Button` | `import { Button } from '../components'` | **All** buttons — primary, secondary, ghost, icon buttons, CTAs |
| `TextInput` | `import { TextInput } from '../components'` | Single-line text fields, search inputs |
| `TextArea` | `import { TextArea } from '../components'` | Multi-line text fields |
| `Dropdown` | `import { Dropdown } from '../components'` | Select menus, dropdown pickers |
| `Radio`, `RadioGroup` | `import { Radio, RadioGroup } from '../components'` | Radio selections |
| `Toggle` | `import { Toggle } from '../components'` | On/off switches |
| `Checkbox` | `import { Checkbox } from '../components'` | Checkboxes |
| `Notification` | `import { Notification } from '../components'` | Inline alerts, banners |
| `Toast` | `import { Toast } from '../components'` | Temporary system notifications (success/warning/error) with auto-dismiss |
| `Dialog` | `import { Dialog } from '../components'` | Modals, confirmation dialogs, destructive-action prompts |
| `DropdownMenu` | `import { DropdownMenu } from '../components'` | Floating menus with search, multi-select, apply/cancel/reset actions |
| `Tooltip` | `import { Tooltip } from '../components'` | Hover labels, info hints (lives in `Popover/Tooltip`) |
| `Tag` | `import { Tag } from '../components'` | Status badges, labels, colored chips (12 color variants) |
| `PlannerChip` | `import { PlannerChip } from '../components'` | Code/data token chips (monospace, orange text) |
| `IntegrationCard` | `import { IntegrationCard } from '../components'` | Third-party integration tiles with logo, description, connect action |
| `DataTable` | `import { DataTable } from '../components'` | All data tables |
| `DashboardWidget` | `import { DashboardWidget } from '../components'` | Dashboard cards/widgets |
| `MenuBar` | `import { MenuBar } from '../components'` | Navigation sidebar |
| `MenuBarItem` | `import { MenuBarItem } from '../components'` | Sidebar nav items |
| `HistoryPanel` | `import { HistoryPanel } from '../components'` | History/recent items panel |
| `UserProfile` | `import { UserProfile } from '../components'` | User avatar/profile display |
| `BrandLogo` | `import { BrandLogo } from '../components'` | Petavue logo |
| `Icon` | `import { Icon } from '../components'` | Custom Figma icons |

> **STOP — before writing ANY UI element, check this table first.**
> If a component exists above, you **MUST** use it. Do not create a new button, input, dropdown, tag, badge, chip, toast, modal, dialog, tooltip, table, card, or notification component.
> Writing a `<button>` tag or a custom `.btn` class when `Button` exists is **always wrong**. The same applies to every component listed here.

### 2. Use Design Tokens — Never Hardcode Values

All colors, typography, and spacing are defined as CSS custom properties. **Never write raw hex values, pixel font sizes, or magic numbers.**

**Colors** — defined in `style/colorography.css`:
```css
/* Primary (Blue) */
var(--color-primary-50)    /* #F5F8FF — lightest */
var(--color-primary-100)   /* #E0EBFE */
var(--color-primary-300)   /* #90A6EE */
var(--color-primary-500)   /* #3661ED — default primary */
var(--color-primary-800)   /* #052DAB — darkest */

/* Neutral (Grey) */
var(--color-neutral-50) through var(--color-neutral-900)

/* Semantic */
var(--color-success)       /* green */
var(--color-warning)       /* yellow */
var(--color-error)         /* red */

/* Text */
var(--color-text-primary)    /* #232532 — body text */
var(--color-text-secondary)  /* #757A97 — muted text */
var(--color-text-disabled)   /* #ADB2CE */
var(--color-text-link)       /* #3661ED */

/* Background */
var(--color-background)      /* #F5F8FF */
var(--color-white)           /* #FFFFFF */

/* Icons */
var(--color-icon-dark)       /* #1F2D2E */
var(--color-icon-medium)     /* #757A97 */
var(--color-icon-light)      /* #ADB2CE */
```

**Typography** — defined in `style/typography.css`:
- Font: Poppins (400 regular, 500 medium, 600 semibold)
- Use typography utility classes: `.text-hero-semibold`, `.text-display-1-medium`, `.text-h1-semibold`, `.text-h2-medium`, `.text-body-1-regular`, `.text-body-2-medium`, `.text-metadata-regular`, etc.
- Pattern: `.text-{scale}-{weight}` where scale is `hero | display-1 | display-2 | h1 | h2 | h3 | body-1 | body-2 | metadata` and weight is `semibold | medium | regular`

**Spacing** — use multiples of 4px: `4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px`

### 3. Icons — Phosphor Icons Only

```jsx
import { House, MagnifyingGlass, Gear } from '@phosphor-icons/react';

<House size={20} weight="regular" color="var(--color-icon-dark)" />
```

- Always specify `weight` prop (`"regular"` or `"bold"`)
- Always use CSS color tokens for icon colors
- Custom design-system icons are in `src/components/Icon/` — check there before adding new icons
- Never use `<img>` tags or emoji for icons

---

## Building New Components

Only create a new component if nothing above fits your need.

- Place in `src/components/ComponentName/` with `ComponentName.jsx` and `ComponentName.css`
- Import token CSS files: `../../colorography/tokens.css` and `../../typography/typography.css`
- Use **named exports**: `export function ComponentName() {}`
- Add to `src/components/index.js` immediately after creation
- Accept `className` prop for external overrides
- Use BEM CSS naming: `.component-name__element`, `.component-name--modifier`
- Keep under 150 lines — split if larger

## Building New Pages

- Place in `pages/PageName/` with `PageName.jsx` and `PageName.css`
- Pages **compose components** — they should NOT contain raw HTML for buttons, inputs, tables, etc.
- Import components from `src/components/` only
- Register route in `src/App.jsx`

## Code Style

- Functional components only — no class components
- `camelCase` for JS variables and props
- `kebab-case` for CSS class names, BEM style
- No inline styles unless absolutely unavoidable
- No `!important` in CSS — ever
- Controlled form components only (`value` + `onChange`)
- All `<input>` elements must have a `<label>`

## Pre-Build Checklist (Run Through This Before Writing Code)

Before creating any new component or writing JSX in a page, answer these questions:

1. **Does a component already exist for this?** Check the table in Section 1 above. If yes → use it, do not recreate.
2. **Am I writing a raw `<button>`, `<input>`, `<select>`, `<dialog>`, or `<table>` tag?** If yes → stop. Use `Button`, `TextInput`, `Dropdown`, `Dialog`, or `DataTable` instead.
3. **Am I creating a colored label/badge/pill?** → Use `Tag` (12 colors available).
4. **Am I showing a temporary notification?** → Use `Toast` (success/warning/error).
5. **Am I showing a modal or confirmation prompt?** → Use `Dialog`.
6. **Am I adding a hover hint or info label?** → Use `Tooltip`.
7. **Am I building a filter/selection menu?** → Use `DropdownMenu`.
8. **Am I writing a hex color, pixel font-size, or hardcoded spacing?** → Use design tokens instead.

## What NOT to Do

- Do NOT install new npm packages without asking first
- Do NOT create new button, input, dropdown, toggle, checkbox, radio, table, notification, toast, dialog, modal, tooltip, tag, badge, or card components — use the existing ones from `src/components/`
- Do NOT write raw HTML elements (`<button>`, `<input>`, `<select>`, `<dialog>`, `<table>`) when a component exists — always use the React component
- Do NOT hardcode any color, font size, spacing, or border radius — use tokens
- Do NOT use `<a href>` for internal navigation — use React Router `<Link>`
- Do NOT skip accessibility — labels, focus states, ARIA roles
- Do NOT use `!important` or inline styles
