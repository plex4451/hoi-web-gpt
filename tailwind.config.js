/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        panel: '#111827',
        panelBorder: '#1f2937',
        panelHighlight: '#0f172a',
      },
    },
  },
  plugins: [],
}
