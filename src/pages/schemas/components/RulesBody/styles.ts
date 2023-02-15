import { styled } from "@/styles";

export const MenuBar = styled('div',{
	display: 'flex',
	gap: '2rem',
	marginLeft: '4rem',
	marginBottom: '1rem',

	'button': {
		display: 'flex',
		gap: '0.5rem',
		padding: '0.5rem 1rem',
		borderRadius: 8,
		background: '$blue300',
		cursor: 'pointer'
	},

	'button[disabled]': {
		cursor: 'not-allowed',
		opacity: 0.7
	}
})

