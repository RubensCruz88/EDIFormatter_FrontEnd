import { styled } from "@/styles";


export const Container = styled('nav',{
	display: 'flex',
	flexDirection: 'column',
	padding: '1rem',
	borderRight: '0.5px solid #C6D2FD',

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

		li: {
			// background: "$blue200",
			// color: "$blue500",
			padding: '0.7rem',
			borderRadius: 8
		},

		"li:hover": {
			background: "$blue100",
			color: '$blue300'
		},
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

