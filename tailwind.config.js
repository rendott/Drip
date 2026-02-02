/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                charcoal: '#1A1A1A',
                'burnt-orange': '#FF8C42',
                bone: '#F5F5F5',
                sage: '#8FBC8F',
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'monospace'],
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
