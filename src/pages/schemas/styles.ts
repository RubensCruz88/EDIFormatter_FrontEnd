import { styled } from "@/styles";

export const Container = styled('div',{
	display: 'flex',
	flexDirection: 'column',
	padding: '2rem',
	width: '90%'
})

export const Header = styled('div',{
	fontSize: '2rem',
	borderBottom: '1px solid black',
	marginBottom: '3rem',
	padding: '0 0 0.5rem 1rem'
})

export const SchemasContainer = styled('div', {
	paddingLeft: '2rem',
	marginRight: '3rem',

	button: {
		cursor:'pointer',
		fontSize: '1.5rem',
		background: 'inherit'
	},

	'.adicionar': {
		marginBottom: '1rem',
	}

})
