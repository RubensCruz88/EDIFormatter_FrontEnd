import { SchemaIdContext } from '@/pages/schemas/contexts/SchemaIdContext';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ReactNode, useContext } from 'react';
import { Cancel, Confirm, Content, Overlay } from './styles';

interface DeleteRuleProps {
	children: ReactNode;
	sequence: string
}

export function DeleteRule({ sequence, children }: DeleteRuleProps) {
	const { deleteRule } = useContext(SchemaIdContext)

	function handleDeleteRule() {
		deleteRule(sequence)
	}

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild>
				{children}
			</AlertDialog.Trigger>

			<AlertDialog.Portal>
				<Overlay />
				
				<Content>
					<AlertDialog.Title className='title'>
						Confirma exclusão?
					</AlertDialog.Title>

					<AlertDialog.Description className='description'>
						confirma exclusão da regra? Esta ação não poderá ser cancelada
					</AlertDialog.Description>

					<div className='buttonRow'>
						<Cancel>
							fechar
						</Cancel>

						<Confirm onClick={handleDeleteRule}>
							Confirmar
						</Confirm>
					</div>
				</Content>

			</AlertDialog.Portal>
		</AlertDialog.Root>		
	)
}