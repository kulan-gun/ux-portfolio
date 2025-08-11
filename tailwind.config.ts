import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"], // Enables dark mode via a 'class' instead of media query
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Scan all files in /pages for class names
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Scan all files in /components
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Scan all files in /app
    "*.{js,ts,jsx,tsx,mdx}", // Scan root files
  ],
  theme: {
    extend: {
      // ---------- FONTS ----------
      fontFamily: {
        // Body text font
        sans: ["Onest", "system-ui", "sans-serif"], // Onest is the primary sans-serif font
        // Headings font (currently the same as body)
        display: ["Onest", "system-ui", "sans-serif"], 
        // Monospace font for typing animation or code blocks - "JetBrains Mono", "monospace"
        mono: ["Recursive", "Ubuntu Mono", "monospace"], 
      },

      // ---------- TYPE SCALE ----------
      fontSize: {
        // Large screens (>640px)
        "display-xl": ["48px", { lineHeight: "50px", fontWeight: "700", letterSpacing: "-0.02em" }],
        "display-l": ["36px", { lineHeight: "40px", fontWeight: "700", letterSpacing: "-0.02em" }],
        "heading-m": ["24px", { lineHeight: "30px", fontWeight: "700" }],
        "heading-s": ["19px", { lineHeight: "25px", fontWeight: "700" }],
        "body-l": ["19px", { lineHeight: "25px" }], // Paragraphs (large)
        "body-m": ["16px", { lineHeight: "20px" }], // Paragraphs (medium)
        "body-s": ["14px", { lineHeight: "20px" }], // Small UI text

        // Small screens (<640px)
        "sm:display-xl": ["32px", { lineHeight: "35px", fontWeight: "700", letterSpacing: "-0.02em" }],
        "sm:display-l": ["27px", { lineHeight: "30px", fontWeight: "700", letterSpacing: "-0.02em" }],
        "sm:heading-m": ["21px", { lineHeight: "25px", fontWeight: "700" }],
        "sm:heading-s": ["19px", { lineHeight: "25px", fontWeight: "700" }],
      },

      // ---------- COLOURS ----------
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "dark-purple": "#5D3FD3", // Example of a fixed hex colour
      },

      // ---------- BORDER RADII ----------
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // ---------- BACKGROUND GRADIENTS ----------
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      // ---------- KEYFRAMES & ANIMATIONS ----------
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}

export default config
