/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.tsx'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif']
			},
			animation: {
				'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				fadeShow: 'fadeShow 1200ms cubic-bezier(0.16, 1, 0.3, 1)',
				fadeClose: 'fadeClose 1200ms cubic-bezier(0.16, 1, 0.3, 1)',
				fadeVerticalShow: 'fadeVerticalShow 1200ms cubic-bezier(0.16, 1, 0.3, 1)',
				fadeVerticalClose: 'fadeVerticalClose 1200ms cubic-bezier(0.16, 1, 0.3, 1)'
			},
			keyframes: {
				fadeShow: { from: { opacity: '0' }, to: { opacity: '1' } },
				fadeClose: { from: { opacity: '1' }, to: { opacity: '0' } },
				fadeVerticalShow: { from: { opacity: '0', top: 0 }, to: { opacity: '1', top: '50%' } },
				fadeVerticalClose: { from: { opacity: '1', top: '50%' }, to: { opacity: '0', top: 0 } }
			}
		}
	},
	plugins: [
		require('tailwindcss/plugin')(({ addVariant }) => {
			addVariant('search-cancel', '&::-webkit-search-cancel-button')
		})
	]
}
