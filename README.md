# Petavue

A data analysis and visualization platform built with React 19. Petavue lets users explore, analyze, and visualize data through AI-powered workbooks, interactive dashboards, and automated reports.

## Quick Start

```bash
npm install
npm start
```

Opens at [http://localhost:5173](http://localhost:5173)

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build | Vite |
| Styling | Plain CSS + design tokens |
| Charts | Recharts |
| Icons | Phosphor Icons |

No TypeScript, no Tailwind, no CSS Modules. Everything is built from our Figma design system.

## Pages

| Page | Path | Description |
|------|------|-------------|
| Workbook Home | `home` | Landing page with search prompt and three analysis modes |
| Workbook List | `workbooks` | Saved workbooks with search, filter, and status tags |
| Workbook Chat | `chat` | AI-powered analysis interface with thought process and data tables |
| Dashboard List | `dashboards` | All dashboards with visibility, owner, and last modified info |
| Dashboard View | `dashboard-view` | Interactive dashboard with widgets, charts, drag-and-drop editing |
| Data Hub | `data-hub` | Data source management with connection status and sync details |
| Projects | `projects` | Project organization with rename-in-place and detail views |
| Reports | `reports` | Generated reports with scheduling and export options |
| Profile | `profile` | User profile and account details |
| Settings | `settings` | App preferences and configuration |

## Component Library

All components are exported from `src/components/index.js`:

**Form & Input:** Button, TextInput, TextArea, Dropdown, Radio, RadioGroup, Toggle, Checkbox

**Feedback:** Notification, Toast, Dialog

**Overlays:** Tooltip, DropdownMenu, Popover

**Data Display:** DataTable, DashboardWidget, Tag, PlannerChip, IntegrationCard

**Navigation:** MenuBar, MenuBarItem, HistoryPanel, UserProfile, BrandLogo

**AI/Sage:** SagePane, SageTextBox, ThoughtProcess, GuidanceActionCard, ModifyPlan

## Design Tokens

All visual values are CSS custom properties — no hardcoded colors, font sizes, or spacing.

### Colors

```css
/* Primary */
var(--color-primary-500)     /* #3661ED */

/* Text */
var(--color-text-primary)    /* #232532 */
var(--color-text-secondary)  /* #757A97 */
var(--color-text-link)       /* #3661ED */

/* Semantic */
var(--color-success)         /* #08BD50 */
var(--color-warning)         /* #FBBF24 */
var(--color-error)           /* #F93D3D */

/* Charts (10-color palette from Figma) */
var(--color-chart-1) through var(--color-chart-10)
```

### Typography

Font: **Poppins** (400 regular, 500 medium, 600 semibold)

Utility classes follow the pattern `.text-{scale}-{weight}`:

```
hero (36px) · display-1 (24px) · display-2 (20px)
h1 (18px) · h2 (16px) · h3 (14px)
body-1 (14px) · body-2 (12px) · metadata (10px)
```

### Spacing

Multiples of 4px: `4, 8, 12, 16, 20, 24, 32, 48, 64, 80`

Available as `var(--spacing-4)` through `var(--spacing-80)`.

## Chart Color System

From the Figma design system:

| # | Hex | Usage |
|---|-----|-------|
| 1 | `#4DA2F7` | Primary chart color |
| 2 | `#93C8FB` | Light blue |
| 3 | `#B472F9` | Purple |
| 4 | `#CA9EFB` | Light purple |
| 5 | `#24C1DA` | Teal |
| 6 | `#7FDBEB` | Light teal |
| 7 | `#686BFB` | Indigo |
| 8 | `#8489FD` | Light indigo |
| 9 | `#37DAE6` | Cyan |
| 10 | `#B0EFF3` | Light cyan |

**Usage rules:**
- **Bar, Line, Area charts:** Use odd colors for contrast — 1 series: #1, 2 series: #1+#3, 3 series: #1+#3+#5
- **Pie, Donut, Funnel:** Use sequential colors #1 through #6

## Project Structure

```
petavue-product/
├── pages/                    # Page components
│   ├── workbook_home/
│   ├── workbook_list/
│   ├── workbook_chat/
│   ├── dashboard_list/
│   ├── dashboard_view/
│   ├── data_hub/
│   ├── projects/
│   ├── reports/
│   ├── profile/
│   └── settings/
├── src/
│   ├── components/           # 30+ reusable components
│   ├── colorography/         # Color tokens (tokens.css)
│   ├── typography/           # Typography system
│   ├── App.jsx               # State-based routing
│   └── main.jsx              # Entry point
├── CLAUDE.md                 # Development conventions
└── package.json
```

## Conventions

- **Functional components only** — no class components
- **Named exports** — `export function ComponentName() {}`
- **BEM CSS** — `.component-name__element--modifier`
- **Design tokens for everything** — never hardcode colors, fonts, or spacing
- **Phosphor Icons only** — always specify `weight` and use color tokens
- **Components under 150 lines** — split if larger
- **Controlled forms** — `value` + `onChange`, all inputs need labels

See [CLAUDE.md](CLAUDE.md) for the full development guide.
