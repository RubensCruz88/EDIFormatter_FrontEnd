import { styled } from "@/styles"
import * as Collapsible from '@radix-ui/react-collapsible';

export const Root = styled(Collapsible.Root,{
	margin: '1rem 0',

	'.dadosLinha': {
		display: 'grid',
		gridTemplateColumns: 'min-content min-content min-content min-content auto',
		columnGap: '1rem',
		lineHeight: '1rem',

		a: {
			cursor: 'pointer'
		}
	
	}
})

export const Detalhes = styled('div',{
	display: 'flex',
	padding: '1rem',
	gap: '0.5rem',

	border: '1px solid black',
	borderRadius: 6,
	marginTop: '0.5rem',
	marginLeft: '1rem'
})