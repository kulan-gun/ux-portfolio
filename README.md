# Portfolio Documentation

## Typography

### Font Family
- **Default sans-serif font**: Onest, with fallbacks to system-ui and then sans-serif.
- **Display font family**: Same as default — Onest, system-ui, sans-serif.

### Typescale

#### Large screens (>640px)
| Token        | Size  | Line Height | Weight | Letter Spacing |
|--------------|-------|-------------|--------|----------------|
| display-xl   | 48px  | 50px        | 700    | -0.02em        |
| display-l    | 36px  | 40px        | 700    | -0.02em        |
| heading-m    | 24px  | 30px        | 700    | —              |
| heading-s    | 19px  | 25px        | 700    | —              |
| body-l       | 19px  | 25px        | —      | —              |
| body-m       | 16px  | 20px        | —      | —              |
| body-s       | 14px  | 20px        | —      | —              |

#### Small screens (<640px)
| Token           | Size  | Line Height | Weight | Letter Spacing |
|-----------------|-------|-------------|--------|----------------|
| sm:display-xl   | 32px  | 35px        | 700    | -0.02em        |
| sm:display-l    | 27px  | 30px        | 700    | -0.02em        |
| sm:heading-m    | 21px  | 25px        | 700    | —              |
| sm:heading-s    | 19px  | 25px        | 700    | —              |

### Default Font
The Tailwind `sans` font family is set to **Onest** by default.

---

## Additional Tokens

### Spacing Scale
| Token  | Value  |
|--------|--------|
| spacing-0  | 0px   |
| spacing-1  | 4px   |
| spacing-2  | 8px   |
| spacing-3  | 12px  |
| spacing-4  | 16px  |
| spacing-5  | 20px  |
| spacing-6  | 24px  |
| spacing-8  | 32px  |
| spacing-10 | 40px  |
| spacing-12 | 48px  |
| spacing-16 | 64px  |
| spacing-20 | 80px  |
| spacing-24 | 96px  |
| spacing-32 | 128px |

### Grid
- **Max content width**: 1280px (Tailwind `container`)
- **Columns**: Flexible, often 12-column grid using `grid-cols-12`
- **Gap sizes**: Tailwind spacing units (e.g., `gap-4`, `gap-8`)

### Border Radius
| Token       | Value  |
|-------------|--------|
| rounded-sm  | 2px    |
| rounded     | 4px    |
| rounded-md  | 6px    |
| rounded-lg  | 8px    |
| rounded-xl  | 12px   |
| rounded-2xl | 16px   |
| rounded-full| 9999px |

### Shadows
| Token         | Example use         |
|---------------|---------------------|
| shadow-sm     | Subtle card shadow  |
| shadow        | Default shadow      |
| shadow-md     | Medium emphasis     |
| shadow-lg     | Elevated cards      |
| shadow-xl     | High emphasis       |

---

## Tech Stack

1. **Next.js & React**  
   The portfolio site runs on React, a JavaScript library for building interactive user interfaces.
  
   Wrapped in Next.js, which provides routing, server-side rendering, and optimised builds for performance and SEO.

2. **TypeScript (TSX)**  
   TypeScript is a typed superset of JavaScript that helps catch bugs and write cleaner code. In other words, it adds static typing to JavaScript, improving code quality and maintainability.  

   `.tsx` files are used for React components with type support — basically React + TypeScript in harmony.

3. **Tailwind CSS**  
   Styling is powered by Tailwind — a utility-first CSS framework. Rather than writing custom CSS, classes are applied classes like `text-xl`, `font-sans`, `px-4` directly in the JSX to style elements quickly and consistently.

4. **Web Fonts & Font Stacks**  
   Fonts such as Onest, Recursive, and Ubuntu Mono are loaded via `<link>` in `layout.tsx`.
   
   In the Tailwind configuration, `fontFamily` defines which font is used for body, headings, and code. The browser falls back through the list if a font fails to load.

5. **Animations & Typing Effects**  
   All that charming cursor-typing effect? That’s hand-coded with React state and `useEffect` to handle typing, deleting, blinking cursor, and text loops.

   CSS animations such as fade-in and bounce are applied using Tailwind’s `animate-` utilities.

6. **Static Content & Hosting**  
   The site is statically rendered and hosted on GitHub Pages.  
   Previously hosted on Vercel for its Next.js optimisations.

7. **Custom Components & UI**  
   Includes reusable components like `TopNavigation`, `ScrollProgressIndicator`, `AnimateOnScroll`, and `SummaryCard`, and others to organise the layout and add interactivity without cluttering pages.

---

### TL;DR Stack Overview

| Layer                  | Tech Used                           | Role                                                            |
|------------------------|-------------------------------------|-----------------------------------------------------------------|
| Framework & Interfaces | Next.js, React                      | Structure, routing, interactivity, SSR                          |
| Language               | TypeScript (.tsx)                   | Type safety, clearer semantics                                  |
| Styling                | Tailwind CSS                        | Utility-first styling with design consistency                   |
| Fonts                  | Onest (body/display), mono fonts    | Typography and brand identity                                   |
| Animations             | React + CSS `<style jsx>` + Tailwind | Micro-interactions and animations                               |
| Deployment & Hosting   | Static site (GitHub Pages)           | Fast, efficient, CDN-ready delivery                             |
