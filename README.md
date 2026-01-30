# Portfolio Documentation

Personal portfolio for [kulangun.com](https://kulangun.com). A static site showcasing selected design work with a distinct **Mission Control** / **Operative OS** aesthetic.

---

## Design Theme & Aesthetic

The portfolio uses a **Future User Interface (FUI)** design language: a "Mission Control" or "Operative OS" vibe that evokes command centres, dashboards, and trust-critical systems. The visual style draws on:

- **Dual-mode theming**: Dark mode (default) with bright green accents (`#00FF94`), and light mode with dark green accents (`#166534`), both optimised for readability and consistency across home and case study pages.
- **FUI micro-interactions**: Visible grid lines, corner markers on cards, a typing-style hero animation, and a live London time display to suggest real-time monitoring.
- **Typography hierarchy**: Sans-serif (DM Sans) for headings and body, monospace (JetBrains Mono) for labels, metadata, and navigational elements.
- **Semantic structure**: Work is presented as "Mission Logs" with projects ordered reverse-chronologically (MISSION 04 at top → MISSION 01 at bottom), reinforcing the operative/control-room metaphor.
- **Theme-aware components**: All UI—including case studies, charts, and cards—responds correctly to light and dark modes via CSS variables and Tailwind classes.

---

## Typography

### Font Family
- **Default sans-serif**: DM Sans, with fallbacks to system-ui and sans-serif.
- **Display font**: Same as default — DM Sans.
- **Monospace**: JetBrains Mono for labels, metadata, and code-like elements.

The Tailwind `sans` font family is set to **DM Sans** by default. In `tailwind.config.ts`, `fontFamily` defines which font is used for body, headings, and mono elements. The browser falls back through the list if a font fails to load.

**Previous typeface:** An earlier version of the portfolio used **Onest** for body and display text, with **Recursive** and **Ubuntu Mono** for monospace and accent elements. The switch to DM Sans and JetBrains Mono was made to better suit the FUI / Mission Control aesthetic — DM Sans offers a clean, geometric quality that works well for both light and dark modes, while JetBrains Mono gives metadata and labels a more technical, system-interface feel.

### Typescale

#### Large screens (>640px)
| Token      | Size  | Line Height | Weight | Letter Spacing |
|------------|-------|-------------|--------|----------------|
| display-xl | 48px  | 50px        | 700    | -0.02em        |
| display-l  | 36px  | 40px        | 700    | -0.02em        |
| heading-m  | 24px  | 30px        | 700    | —              |
| heading-s  | 19px  | 25px        | 700    | —              |
| body-l     | 19px  | 25px       | —      | —              |
| body-m     | 16px  | 20px       | —      | —              |
| body-s     | 14px  | 20px       | —      | —              |

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

The typescale is used consistently across the site. Display tokens are for hero headlines and major sections; heading tokens for section titles; body tokens for paragraphs and general UI. FUI letter-spacing tokens add a technical, label-like feel to uppercase nav text and metadata.

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

Spacing follows an 4px base unit (Tailwind’s default). Use these tokens for padding, margins, and gaps to keep layouts consistent.

### Grid
- **Max content width**: 1280px (Tailwind `max-w-6xl`).
- **Columns**: Flexible, often 12-column grid using `grid-cols-12`.
- **Gap sizes**: Tailwind spacing units (e.g. `gap-4`, `gap-8`).

Content is centered within a max-width container. On smaller screens, columns collapse and gaps reduce to suit the viewport.

### Border Radius
| Token       | Value  |
|-------------|--------|
| rounded-sm  | 2px    |
| rounded     | 4px    |
| rounded-md  | 6px    |
| rounded-lg  | 8px    |
| rounded-xl  | 12px   |
| rounded-2xl | 16px   |
| rounded-fui | 2px    |
| rounded-fui-lg | 4px |
| rounded-full| 9999px |

Standard radii apply to cards, buttons, and images. FUI tokens (`rounded-fui`, `rounded-fui-lg`) use small radii (2px, 4px) to keep the interface feeling precise and technical.

### Shadows
| Token     | Example use         |
|-----------|---------------------|
| shadow-sm | Subtle card shadow  |
| shadow    | Default shadow      |
| shadow-md | Medium emphasis     |
| shadow-lg | Elevated cards      |
| shadow-xl | High emphasis       |

Shadows are used sparingly. Subtle shadows (`shadow-sm`, `shadow`) work well for cards; stronger ones for modals and elevated elements.

---

## Tech Stack

| Layer                | Tech Used                             | Role                                                       |
|----------------------|----------------------------------------|------------------------------------------------------------|
| Framework            | Next.js 15 (App Router)                | Routing, static generation, optimised builds               |
| Language             | TypeScript (TSX)                       | Type safety, clearer semantics                             |
| UI Library           | React 18                               | Components and interactivity                               |
| Styling              | Tailwind CSS                           | Utility-first styling, FUI tokens, responsive layout       |
| Fonts                | DM Sans, JetBrains Mono (Google Fonts) | Typography and brand identity                              |
| Icons                | Lucide React                           | UI and navigation icons                                    |
| UI Components        | Radix UI, shadcn/ui                    | Accessible primitives and composable components            |
| Animations           | React + Tailwind keyframes             | Typing effect, fade-in-up, cursor blink                    |
| Theme                | Custom (`use-operative-theme`)         | Light/dark mode via localStorage and `class` on `<html>`   |
| Deployment           | Static export → GitHub Pages           | CDN-ready hosting via `gh-pages`                           |

The site runs on React within Next.js, which provides routing, server-side rendering, and optimised static builds. TypeScript (`.tsx`) adds static typing for clearer code and fewer bugs. Tailwind is used for utility-first styling, with custom FUI colours and tokens defined in `tailwind.config.ts` and `globals.css`. Fonts are loaded via Google Fonts in `layout.tsx`. The typing effect and animations are hand-coded with React state and Tailwind keyframes. Theme switching uses a custom hook (`use-operative-theme`) and an inline script to avoid flash on load; there is no dependency on `next-themes`. The site is statically exported and published to the `gh-pages` branch for hosting on GitHub Pages.

### Build & Deploy
```bash
npm run dev      # Local development
npm run build    # Production build (output: /out)
npm run deploy   # Build + publish to gh-pages branch
```

---

## Key Components

| Component                | Role                                                                 |
|--------------------------|----------------------------------------------------------------------|
| `TopNavigation`          | Header with logo, nav links, theme toggle; responsive grid on mobile |
| `ThemeToggle`            | Light/dark mode switch (centered on mobile, right on desktop)        |
| `CaseStudyPreview`       | Mission log card with image, status badge, corner markers            |
| `CaseStudyLayout`        | Case study shell with sticky left nav and scroll progress            |
| `ScrollProgressIndicator`| Horizontal loading bar for reading progress                          |
| `ScrollSpyNavigation`    | Left-nav highlights active section on case study pages               |
| `Footer`                 | MAIN / CONTACT links, copyright, tagline                             |
| `StatusBadge`            | Shipped / Concept labels with FUI styling                            |
| `AnimateOnScroll`        | Fade-in-up and staggered reveal                                      |
| `SummaryCard`, `QuoteCard`, `MetricsDisplay` | Reusable content blocks for case studies   |
| `DataTable`, `BarChart`, `SystemDiagram`     | Data and diagram components         |

These components organise layout and add interactivity without cluttering pages. `TopNavigation` and `Footer` wrap all main content. Case study pages use `CaseStudyLayout` for the left-nav shell and scroll progress; `ScrollSpyNavigation` highlights the active section as the user scrolls. Content blocks (`SummaryCard`, `QuoteCard`, `MetricsDisplay`, etc.) are reused across case studies for consistent presentation of overviews, quotes, and data.

---

## Site Structure

- **/** — Home: hero with typing animation, Mission Logs (reverse chronological)
- **/case-studies/contactless-travel/** — MISSION 04 (most recent)
- **/case-studies/ai-design/** — MISSION 03
- **/case-studies/benefits-case-study/** — MISSION 02
- **/case-studies/crm-case-study/** — MISSION 01 (oldest)

The home page lists Mission Logs in reverse chronological order, with the most recent project at the top. Each case study has its own route under `/case-studies/` and uses the shared `CaseStudyLayout` with scroll-spy navigation.

---

## About

**kulangun.com** — Made by Kulan Gunawardena
