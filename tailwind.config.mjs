import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        fontFamily: {
            sans: ['Fira Sans', ...defaultTheme.fontFamily.sans],
            mono: ['Fira Mono', ...defaultTheme.fontFamily.mono],
        },
        extend: {
            lineHeight: {
                12: '3rem',
            },
        },
    },
    plugins: [],
}
