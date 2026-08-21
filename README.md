# Portfolio Documentation

Personal portfolio for [kulangun.com](https://kulangun.com). A static site showcasing selected design work with a **Future User Interface (FUI)** / **Operative OS** aesthetic.

---

## Design Theme & Aesthetic

The portfolio uses an FUI design language: a calm “command centre” feel for trust-critical systems work — without overdoing theatrical UI chrome. The visual style draws on:

- **Dual-mode theming**: Dark mode (default) with bright green accents (`#00FF94`), and light mode with dark green accents (`#166534`), both optimised for readability across home and case study pages.
- **FUI micro-interactions**: Monospace labels, status badges, a **one-shot typewriter** on the hero tagline, a live London time display, a **falling-particle hero background** (circles in the FUI palette), and a restrained **1% project-card hover lift**.
- **Case-study motion**: A shared 500ms soft reveal with short travel, no artificial stagger delays, synchronised metric timing, and reduced-motion support.
- **Typography hierarchy**: Sans-serif (DM Sans) for headings and body; monospace (JetBrains Mono) for labels, metadata, and navigation.
- **Semantic structure**: Selected work is labelled **Projects** (`PROJECT 01`–`03`), newest first. Older work lives in **Archive**.
- **Theme-aware components**: Home, archive, and case studies respond to light/dark via CSS variables and Tailwind classes.

---

## Typography

### Font Family
- **Default sans-serif**: DM Sans, with fallbacks to system-ui and sans-serif.
- **Display font**: Same as default — DM Sans.
- **Monospace**: JetBrains Mono for labels, metadata, and code-like elements.

The Tailwind `sans` font family is set to **DM Sans** by default in `tailwind.config.ts`.

**Previous typeface:** An earlier version used **Onest** for body/display and **Recursive** / **Ubuntu Mono** for monospace. The switch to DM Sans and JetBrains Mono better suits the FUI aesthetic.

### Typescale

#### Large screens (>640px)
| Token      | Size  | Line Height | Weight | Letter Spacing |
|------------|-------|-------------|--------|----------------|
| display-xl | 48px  | 50px        | 700    | -0.02em        |
| display-l  | 36px  | 40px        | 700    | -0.02em        |
| heading-m  | 24px  | 30px        | 700    | —              |
| heading-s  | 19px  | 25px        | 700    | —              |
| body-l     | 19px  | 25px        | —      | —              |
| body-m     | 16px  | 20px        | —      | —              |
| body-s     | 14px  | 20px        | —      | —              |

#### Small screens (<640px)
| Token         | Size  | Line Height | Weight | Letter Spacing |
|---------------|-------|-------------|--------|----------------|
| sm:display-xl | 32px  | 35px        | 700    | -0.02em        |
| sm:display-l  | 27px  | 30px        | 700    | -0.02em        |
| sm:heading-m  | 21px  | 25px        | 700    | —              |
| sm:heading-s  | 19px  | 25px        | 700    | —              |

### FUI Letter Spacing
| Token      | Value  |
|------------|--------|
| widest-fui | 0.15em |
| wider-fui  | 0.1em  |

---

## Additional Tokens

### Spacing Scale
| Token      | Value  |
|------------|--------|
| spacing-0  | 0px    |
| spacing-1  | 4px    |
| spacing-2  | 8px    |
| spacing-3  | 12px   |
| spacing-4  | 16px   |
| spacing-5  | 20px   |
| spacing-6  | 24px   |
| spacing-8  | 32px   |
| spacing-10 | 40px   |
| spacing-12 | 48px   |
| spacing-16 | 64px   |
| spacing-20 | 80px   |
| spacing-24 | 96px   |
| spacing-32 | 128px  |

Spacing follows a 4px base unit (Tailwind’s default).

### Grid
- **Max content width**: 1280px (Tailwind `max-w-6xl`).
- **Columns**: Flexible; often a 12-column grid via `grid-cols-12`.
- **Gap sizes**: Tailwind spacing units (e.g. `gap-4`, `gap-8`).

### Border Radius
| Token          | Value  | Intended use                                      |
|----------------|--------|---------------------------------------------------|
| rounded-fui    | 2px    | Compact controls and small FUI details            |
| rounded-fui-lg | 4px    | Cards, metric panels, diagrams and content blocks |
| rounded-xl     | 12px   | Project imagery, screenshots and media previews   |
| rounded-full   | 9999px | Status dots, circular icons and intentional pills |

Functional surfaces use small radii to keep the interface precise and technical. Media receives a slightly larger radius so screenshots and project imagery remain visually distinct from interface containers.

### Shadows
Used sparingly (`shadow-sm` through `shadow-xl`) for cards and elevated surfaces.

---

## Tech Stack

| Layer          | Tech Used                                      | Role                                                        |
|----------------|------------------------------------------------|-------------------------------------------------------------|
| Framework      | Next.js 15 (App Router)                        | Routing, static generation, optimised builds                |
| Language       | TypeScript (TSX)                               | Type safety                                                 |
| UI Library     | React 18                                       | Components and interactivity                                |
| Styling        | Tailwind CSS                                   | Utility-first styling, FUI tokens, responsive layout        |
| Fonts          | DM Sans, JetBrains Mono (Google Fonts)         | Typography                                                  |
| Icons          | Lucide React                                   | UI and navigation icons                                     |
| UI Components  | Radix UI, shadcn/ui                            | Accessible primitives                                       |
| Animations     | React + Tailwind keyframes                     | One-shot hero typewriter, fade-in-up, cursor blink          |
| Hero particles | [Sparticles](https://github.com/simeydotme/sparticles) (vendored) | Canvas falling circles (`HeroSparticles`)     |
| Theme          | Custom (`use-operative-theme`)                 | Light/dark via localStorage and `class` on `<html>`         |
| Deployment     | Static export → GitHub Pages                   | Publish via `gh-pages` branch                               |

The site is statically exported and hosted on GitHub Pages (`kulangun.com`). Theme switching uses a custom hook and an inline script in `layout.tsx` to avoid flash on load (no `next-themes`). **`git push` to `main` does not deploy the live site** — run `npm run deploy` to build and publish to `gh-pages`.

### Build & Deploy
```bash
npm run dev      # Local development
npm run build    # Production build (output: /out)
npm run deploy   # Build + publish to gh-pages branch
```

---

## Key Components

| Component                 | Role                                                                 |
|---------------------------|----------------------------------------------------------------------|
| `HeroSparticles`          | Home hero canvas: falling circles via vendored Sparticles            |
| `TopNavigation`           | Logo, Work / Credentials / LinkedIn / Articles, theme toggle         |
| `ThemeToggle`             | Light/dark switch                                                    |
| `CaseStudyHeader`         | Shared case study tags, H1, subtitle, and hero image                 |
| `CaseStudyPreview`        | Project card: optional `PROJECT` seq, title, subtitle, status, image |
| `CaseStudyLayout`         | Shared case study shell (sticky left nav + scroll progress)          |
| `ScrollProgressIndicator` | Horizontal reading progress bar                                      |
| `ScrollSpyNavigation`     | Highlights active section in case study left nav                     |
| `Footer`                  | MAIN (Work, Articles, Credentials, Archive) / CONTACT (LinkedIn)     |
| `StatusBadge`             | SHIPPED / CONCEPT / ARCHIVED (and related) FUI labels                |
| `AnimateOnScroll`         | Shared soft reveal for case-study narrative groups                    |
| `SummaryCard`, `QuoteCard`, `MetricsDisplay` | Reusable case study content blocks              |
| `DataTable`, `BarChart`, `SystemDiagram`     | Data and diagram components                       |

`HeroSparticles` powers the home hero background. Selected projects use a short **title** plus an outcome-focused **subtitle**. Case study pages share `CaseStudyHeader` for tags, H1, subtitle, and hero image (sourced from `lib/projects.ts`) so home, Archive, and case studies stay in sync.

### Hero (`app/page.tsx`)

| Element | Behaviour |
|---------|-----------|
| **Tagline** | “Optimising the experience of trust-critical systems.” types out **once** on load (~36ms/character), then stays. Cursor hides when finished. Skipped (full text immediately) when `prefers-reduced-motion: reduce`. |
| **Particles** | See below |
| **Clock** | Live London time (Europe/London), decorative |

### Hero particles (`HeroSparticles`)

Full-bleed HTML5 canvas via [Sparticles](https://github.com/simeydotme/sparticles). Vendored at `public/vendor/sparticles.js` and loaded at runtime (not through the Next.js JS bundle).

| Concern | Implementation |
|---------|----------------|
| **Where** | `components/hero-sparticles.tsx`, in the home hero `<section>` |
| **Shapes** | Circles only (`shape: "circle"`) |
| **Motion** | Downward fall (`direction: 180`), twinkle, light parallax |
| **Colours** | Dark: `#00FF94`, `#3B82F6`, `#FAFAFA`, `#888888` — Light: `#166534`, `#111111`, `#888888` |
| **Size** | `minSize: 5`, `maxSize: 20` (dark) / `15` (light); count scales with viewport width |
| **Accessibility** | Skipped when `prefers-reduced-motion: reduce` |
| **Readability** | Gradient overlay (`from-background/85`) keeps headline text legible |

Tune via `getOptions()` in `hero-sparticles.tsx`.

Project titles, subtitles, clients, roles, and cover images live in `lib/projects.ts` and feed the home page, Archive page, and `CaseStudyHeader`.

---

## Site Structure

### Navigation
- **Top nav**: Work (`/#work`), Credentials (Credly), LinkedIn, Articles (Medium)
- **Footer MAIN**: Work, Articles, Credentials, **Archive** (`/work/archived/`)
- **Footer CONTACT**: LinkedIn

### Routes

| Path | Description |
|------|-------------|
| **/** | Home — hero (particles + one-shot tagline), **Projects** (`PROJECT 03` → `01`) |
| **/work/archived/** | **Archive** — AURA and CRM (no project numbers; status **ARCHIVED**); linked from footer MAIN |
| **/case-studies/contentnext-case-study/** | **PROJECT 03** — ContentNext (Autodesk, 2025/26, Shipped) |
| **/case-studies/contactless-travel/** | **PROJECT 02** — Digital immigration and contactless travel (GOV.UK, 2024/25, Shipped) |
| **/case-studies/benefits-case-study/** | **PROJECT 01** — Improving access to benefits for those in need (GOV.UK, 2024, Shipped) |
| **/case-studies/ai-design/** | Archived — AURA (Capgemini Invent, 2024/25) |
| **/case-studies/crm-case-study/** | Archived — Customer relationship management (Anglian Water, 2023) |

Selected work on the home page is reverse-chronological (**newest = PROJECT 03**). **Archive** is reachable from the footer MAIN link only. Archived case study pages use status **Archived** and Back returns to `/work/archived/`. Case study URLs for archived work are unchanged.

---

## About

**kulangun.com** — Made by Kulan Gunawardena
