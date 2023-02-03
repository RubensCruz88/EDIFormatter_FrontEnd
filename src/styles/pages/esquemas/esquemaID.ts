import { styled } from "@/styles";


export const Container = styled('div',{
	display: 'flex',
	flexDirection: 'column',
	padding: '2rem',
	width: '90%',

	".regras": {
		paddingLeft: '2rem',
		marginRight: '3rem',
	}
})

export const Header = styled('div',{
	fontSize: '2rem',
	borderBottom: '1px solid black',
	marginBottom: '3rem',
	padding: '0 0 0.5rem 1rem'
})

export const MenuBar = styled('div',{
	display: 'flex',
	gap: '2rem',
	marginLeft: '3rem',
	marginBottom: '1rem',

	'button': {
		display: 'flex',
		gap: '0.5rem',
		padding: '0.5rem 1rem',
		borderRadius: 8
	}
})

export const Row = styled('div',{
	display: 'flex',
	alignContent: 'center',
	gap: '1rem',
	lineHeight: '1.5rem',
	margin: '1rem 0',
	border: '1px solid black',
	padding: '0.7rem',
	borderRadius: 6,

	span: {
		display: 'flex',
		alignItems: 'center',
	},

	// 'span:last-child': {
	// 	flexGrow: "inherit"
	// },

	'.tamanho': {
		display: 'flex',
		width: '2rem',
		background: '#C5C6D0',
		borderRadius: 6,
		justifyContent: 'center',
		flexGrow: 'inherit'
		// maxHeight: '1.5rem',
		
	}

})