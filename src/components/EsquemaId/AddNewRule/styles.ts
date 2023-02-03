import { styled } from '@/styles';
import * as Dialog from '@radix-ui/react-dialog';

export const Adicionar = styled('button',{
	cursor: 'pointer',
})

export const Overlay = styled(Dialog.Overlay,{
	position: 'fixed',
	width: '100vw',
	height: '100vh',
	inset: 0,
	background: 'rgba(0, 0, 0, 0.75)'
})

export const Content = styled(Dialog.Content,{
	minWidth: 'calc(100vw/2)',
	borderRadius: 6,
	background: 'Gray',

	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%,-50%)',
	padding: '1rem',

	form: {
		marginTop: '2rem',

		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',

		div: {
			display: 'flex',
			gap: '1rem'
		},

		input: {
			borderRadius: 6,
			border: 0,
			padding: '1rem'
		}
	},

	button: {
		borderRadius: 6,
		padding: '0.5rem',
		marginTop: '1rem'
	},

})

export const CloseButton = styled(Dialog.Close,{
	position: 'absolute',
	background: 'transparent',
	top: 0,
	right: '0.5rem',
	cursor: 'pointer'
})

export const SaveButton = styled('button',{
	display: 'flex',
	gap: '0.5rem',
	fontWeight: 'bold',
	cursor: 'pointer',

	width: 'fit-content',

})
