import { styled } from "@/styles";

export const Container = styled('div',{
	display: 'flex',
	flexDirection: 'column',
	padding: '2rem',
	width: '90%',
	gap: '2rem'
})

export const Header = styled('div',{
	fontSize: '2rem',
	borderBottom: '1px solid black',
	marginBottom: '3rem',
	padding: '0 0 0.5rem 1rem'
})

export const Form = styled('form',{
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',

	"button": {
		display: 'flex',
		gap: '0.5rem',
		padding: '0.5rem 1rem',
		borderRadius: 8,
		background: '$blue300',
		cursor: 'pointer',
		flexShrink: 0,
		alignSelf: 'flex-start'
	},

	"input": {
		borderRadius: 6,
		border: '1px solid gray',
		padding: '0.5rem',
		flexGrow: 1
	}
})