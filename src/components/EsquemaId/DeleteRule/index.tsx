import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ReactNode } from 'react';
import { Cancelar, Confirmar, Content, Overlay } from './styles';

interface DeleteRuleProps {
	children: ReactNode;
	deleteRule: (sequencia: string) => void;
	sequencia: string
}


export function DeleteRule({ sequencia, deleteRule, children }: DeleteRuleProps) {
	function handleDeleteRule() {
		deleteRule(sequencia)
	}

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild>
				{children}
			</AlertDialog.Trigger>

			<AlertDialog.Portal>
				<Overlay />
				
				<Content>
					<AlertDialog.Title className='titulo'>
						Confirma exclusão?
					</AlertDialog.Title>

					<AlertDialog.Description className='descricao'>
						confirma exclusão da regra? Esta ação não poderá ser cancelada
					</AlertDialog.Description>

					<div className='botoes'>
						<Cancelar>
							fechar
						</Cancelar>

						<Confirmar onClick={handleDeleteRule}>
							Confirmar
						</Confirmar>
					</div>
				</Content>

			</AlertDialog.Portal>
		</AlertDialog.Root>		
	)
}