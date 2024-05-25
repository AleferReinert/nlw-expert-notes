/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.tsx'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif']
			},
			animation: {
				'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			}
		}
	},
	plugins: [
		require('tailwindcss/plugin')(({ addVariant }) => {
			addVariant('search-cancel', '&::-webkit-search-cancel-button')
		})
	]
}
