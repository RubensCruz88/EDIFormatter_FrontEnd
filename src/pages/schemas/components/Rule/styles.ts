import { styled } from "@/styles";


export const Row = styled('div',{
	display: 'flex',
	alignContent: 'center',
	gap: '1rem',
	lineHeight: '1.5rem',
	margin: '1rem 0',
	border: '1px solid $blue300',
	padding: '0.2rem 1rem',
	borderRadius: 6,

	button: {
		cursor: 'pointer',
		background: 'transparent',
		display: 'flex',
		alignItems: 'center',
	},

	'.edit:hover': {
		color: 'Green'
	},

	'.delete:hover': {
		color: "Red"
	},

	span: {
		display: 'flex',
		alignItems: 'center',
	},

	'.draggable': {
		cursor: 'grab'
	},

	'.fieldSize': {
		display: 'flex',
		width: '2rem',
		background: '$blue100',
		borderRadius: 6,
		justifyContent: 'center',
		flexGrow: 'inherit'
		
	},

	variants: {
		isDragging: {
			true: {
				border: '2px dashed rgba(0, 0, 0, 0.2)',
				padding: '0.2rem 1rem',
				cursor: 'grabbing',

				span: {
					opacity: 1
				}
			}
		}
	}
	
})