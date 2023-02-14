import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Trash } from 'phosphor-react';
import { useContext } from 'react';
import { SchemasContext } from '../../contexts/SchemasContext';
import { Cancel, Confirm, Content, Overlay } from './styles';

interface DeleteSchemaProps {
	schemaKey: string
}

export function DeleteSchema({ schemaKey }: DeleteSchemaProps) {
	const { deleteSchema } = useContext(SchemasContext)

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
					<AlertDialog.Title className='title'>
						Confirma exclusão?
					</AlertDialog.Title>

					<AlertDialog.Description className='description'>
						confirma exclusão deste esquema? Esta ação não poderá ser cancelada
					</AlertDialog.Description>

					<div className='actionRow'>
						<Cancel>
							Cancelar
						</Cancel>

						<Confirm onClick={handleDeleteConfig}>
							Confirmar
						</Confirm>
					</div>
				</Content>

			</AlertDialog.Portal>
		</AlertDialog.Root>
	)
}