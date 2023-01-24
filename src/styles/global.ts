import { globalCss } from ".";

export const globalStyles = globalCss({
	'*': {
		margin: 0,
		padding: 0,
		border: 0,
		boxSizing: 'border-box'
	},

	'body, input, textarea, button, a': {
		fontWeight: 400,
		textDecoration: 'none',
		font: 'inherit',
		color: 'inherit',
		fontFamily: 'Roboto'
	},

	'ol, ul': {
		listStyle: 'none'
	},

})