import { styled } from "@/styles";


export const Container = styled('div',{
	display: 'flex',
	flexDirection: 'column',
	padding: '2rem',
	width: '90%',

	".regras": {
		paddingLeft: '2rem',
		marginRight: '3rem',
	},

	".ruleRow": {
		marginLeft: '2rem'
	}
})

export const Header = styled('div',{
	fontSize: '2rem',
	borderBottom: '1px solid black',
	marginBottom: '3rem',
	padding: '0 0 0.5rem 1rem'
})

