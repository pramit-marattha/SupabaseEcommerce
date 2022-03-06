module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    mytheme: {
      primary: "#db2087",
      secondary: "#c69ce5",
      accent: "#89f9f9",
      neutral: "#1B1C32",
      "base-100": "#3B3460",
      info: "#2AA3EA",
      success: "#68EECA",
      warning: "#F29D3A",
      error: "#E9536F",
      "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
      "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
      "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
      "--animation-btn": "0.25s", // duration of animation when you click on button
      "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
      "--btn-text-case": "uppercase", // set default text transform for buttons
      "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
      "--border-btn": "1px", // border width of buttons
      "--tab-border": "1px", // border width of tabs
      "--tab-radius": "0.5rem", // border radius of tabs
    },
  },

  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
