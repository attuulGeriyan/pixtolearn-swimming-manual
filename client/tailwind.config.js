module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e3edf9',
          100: '#c7dbf3',
          200: '#8fb7e7',
          300: '#5793db',
          400: '#1f6fcf',
          500: '#2B4C8C', // Main brand color
          600: '#223d70',
          700: '#1a2e54',
          800: '#111f38',
          900: '#090f1c',
        },
        accent: {
          100: '#e6f3ff',
          200: '#99d6ff',
          300: '#4dbaff',
          400: '#009dff',
          500: '#0080cc',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
