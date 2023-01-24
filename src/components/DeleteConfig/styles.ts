import { styled } from "@/styles";
import * as AlertDialog from '@radix-ui/react-alert-dialog';


export const Overlay = styled(AlertDialog.Overlay,{
	position: 'fixed',
	width: '100vw',
	height: '100vh',
	inset: 0,
	background: 'rgba(0, 0, 0, 0.75)'
})

export const Trigger = styled(AlertDialog.Trigger,{
	
})

export const Content = styled(AlertDialog.Content,{
	minWidth: 300,
	borderRadius: 6,
	background: 'White',

	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%,-50%)',
	padding: '1.5rem',

	'.titulo': {
		marginBottom: '1rem'
	},

	'.descricao': {
		marginBottom: '1.5rem'
	},

	'.botoes': {
		display: 'flex',
		gap: '1rem',
		minWidth: 'calc(100vw/3)',

		button: {
			cursor: 'pointer',
			padding: '0.5rem',
			borderRadius: 6,
			fontWeight: 'bold',
			fontSize: '1rem'
		}
	},


})

export const Cancelar = styled(AlertDialog.Cancel,{
	background: '#98BF64',
	color: '#32612D'
})

export const Confirmar = styled(AlertDialog.Action, {
	background: '#FF5C5C',
	color: '#960018'
})