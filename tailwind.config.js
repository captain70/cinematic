/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const Myclass = plugin(function ({ addUtilities }) {
	addUtilities({
		'.my-rotate-y-180': {
			transform: 'rotateY(180deg)',
		},
		'.preserve-3d': {
			transformStyle: 'preserve-3d',
		},
		'.perspective': {
			perspective: '1000px',
		},
		'.backface-hidden': {
			backfaceVisibility: 'hidden',
		},
		'.content-hidden': {
			'content-visibility': 'hidden',
		},
	});
});

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				themeBlue: '#17a2b8',
				textGray: '#212529',
			},
		},
	},
	plugins: [Myclass],
};
