/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#111111",
          700: "#757575",
          500: "#aaaaaa",
        },
        light: {
          100: "#ffffff",
          200: "#f5f5f5",
          300: "#e5e5e5",
          400: "#cccccc",
        },
        green: "#007d48",
        red: "#d33918",
        orange: "#d37918",
      },
      fontFamily: {
        jost: ["Jost", "sans-serif"],
      },
      fontSize: {
        "heading-1": [
          "72px",
          {
            lineHeight: "78px",
            fontWeight: "700",
          },
        ],
        "heading-2": [
          "56px",
          {
            lineHeight: "60px",
            fontWeight: "700",
          },
        ],
        "heading-3": [
          "24px",
          {
            lineHeight: "30px",
            fontWeight: "500",
          },
        ],
        lead: [
          "20px",
          {
            lineHeight: "28px",
            fontWeight: "500",
          },
        ],
        body: [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "400",
          },
        ],
        "body-medium": [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "500",
          },
        ],
        caption: [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "500",
          },
        ],
        footnote: [
          "12px",
          {
            lineHeight: "18px",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [],
}
