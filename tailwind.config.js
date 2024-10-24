const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        calibri: ["calibri", "calibri"],
      },
      colors: {
        sixty: "var(--color-sixty)",
        fifty: "var(--color-fifty)",
        thirty: "var(--color-thirty)",
        ten: "var(--color-ten)",
        overSixty: "var(--color-overSixty)",
        overThirty: "var(--color-overThirty)",
        overFifty: "var(--color-overFifty)",
        overTen: "var(--color-overTen)",

        destructive: "#ef233c",

        border: "var(--color-thirty)",
        input: "var(--color-sixty)",
        ring: "var(--color-fifty)",
        background: "var(--color-sixty)",
        foreground: "var(--color-overSixty)",
        primary: {
          DEFAULT: "var(--color-ten)",
          foreground: "var(--color-overTen)",
        },
        secondary: {
          DEFAULT: "var(--color-thirty)",
          foreground: "var(--color-overThirty)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-overDestructive)",
        },
        muted: {
          DEFAULT: "var(--color-ten)",
          foreground: "var(--color-overTen)",
        },
        accent: {
          DEFAULT: "var(--color-ten)",
          foreground: "var(--color-overTen)",
        },
        popover: {
          DEFAULT: "var(--color-ten)",
          foreground: "var(--color-overTen)",
        },
        card: {
          DEFAULT: "var(--color-ten)",
          foreground: "var(--color-overTen)",
        },
      },
      borderRadius: {
        xl: "12px", // Replace with custom value if needed
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
    },
  },
  plugins: [animate],
};
