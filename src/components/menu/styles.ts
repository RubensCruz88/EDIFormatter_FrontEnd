import { styled } from "@/styles";


export const Container = styled('nav',{
	backgroundColor: '#B9BBB6',
	display: 'flex',
	flexDirection: 'column',
	padding: '1rem',

	'#check': {
		display: 'none'
	},

	label: {
		cursor: 'pointer',
		marginBottom: '1rem',
	},

	ul: {
		display: 'flex',
		flexDirection: 'column',
		gap: '0.5rem',
		fontSize: '1.5rem',

		a: {
			display: 'flex',
			gap: '0.5rem',
			height: '1.4rem',
	}

	},

	'#check:checked ~ ul li span': {
		display: 'none',
		opacity: 1,
		transitionProperty: '1s'
	},
})

