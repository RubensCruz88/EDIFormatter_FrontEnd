import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Trash } from 'phosphor-react';
import { Cancelar, Confirmar, Content, Overlay } from './styles';

interface DeleteSchemaProps {
	deleteSchema: (data: any) => Promise<void>;
	schemaKey: String
}

export function DeleteConfig({ deleteSchema, schemaKey }: DeleteSchemaProps) {
	function handleDeleteConfig () {
		deleteSchema(schemaKey)
	}

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Trash weight='bold' size={16}/>
			</AlertDialog.Trigger>

			<AlertDialog.Portal>
				<Overlay />
				
				<Content>
					<AlertDialog.Title className='titulo'>
						Confirma exclusão?
					</AlertDialog.Title>

					<AlertDialog.Description className='descricao'>
						confirma exclusão do esquema X? Esta ação não poderá ser cancelada
					</AlertDialog.Description>

					<div className='botoes'>
						<Cancelar>
							fechar
						</Cancelar>

						<Confirmar onClick={handleDeleteConfig}>
							Confirmar
						</Confirmar>
					</div>
				</Content>

			</AlertDialog.Portal>
		</AlertDialog.Root>
	)
}