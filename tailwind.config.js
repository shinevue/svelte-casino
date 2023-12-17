/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{svelte,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				main: "url('img/bg-main.jpg')",
				login: "url('img/bg-login.jpg')"
			},
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				dark: '#1f1c21',
				orange: '#f7550a',
				'orange-dark': '#5f1919',
				'almost-white': '#f5f1ed',
				gray: { 100: '#dbd5de', 200: '#a8a7a8', 300: '#a8a8a9', 900: '#1f1c21' },
				melon: {
					100: '#fb6f92',
					200: '#FFD5CC',
					300: '#FFC1B3',
					400: '#FFA38F',
					500: '#FF8F75',
					600: '#FF6D4D',
					700: '#C92718',
					800: '#A32014',
					900: '#80190F',
					950: '#59140D'
				}
			},
			fontFamily: {
				emoji: ['Noto Color Emoji', 'sans-serif'],
				main: ['DM Sans', 'sans-serif'],
				heading: ['Poppins', 'DM Sans', 'sans-serif']
			}
		}
	},
	plugins: [require('flowbite/plugin'), require('@tailwindcss/forms')]
};
