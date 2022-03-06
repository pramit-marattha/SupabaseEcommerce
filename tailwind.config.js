module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#9bf2d3",
          secondary: "#d33d53",
          accent: "#d648d6",
          neutral: "#23232F",
          "base-100": "#3D3D52",
          info: "#89A6F5",
          success: "#2ACFB7",
          warning: "#DDAE03",
          error: "#E87C69",
        },
      },
    ],
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
