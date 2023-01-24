import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, SaveButton } from './styles';
import { FloppyDisk, X } from 'phosphor-react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
	descricao: string
}

interface Esquema {
	descricao: string
}

interface AddNewSchemaProps {
	addNewSchema: (data: Esquema) => Promise<void>
}

export function AddNewConfig({addNewSchema}: AddNewSchemaProps) {
	const {register, handleSubmit } = useForm<Inputs>();

	const submitNovoEsquema: SubmitHandler<Inputs> = async (data) => {
		const { descricao } = data;


		
		addNewSchema({
			descricao
		})
	}

	return (
		<Dialog.Portal>
			<Overlay />

			<Content>
				<Dialog.Title>Novo Esquema</Dialog.Title>

				<CloseButton>
					<X size={24}/>
				</CloseButton>

				<form onSubmit={handleSubmit(submitNovoEsquema)} >
					<input type="text" placeholder='Descrição' required {...register('descricao')} />

					<SaveButton>
						<FloppyDisk />
						Salvar
					</SaveButton>
				</form>


			</Content>
		</Dialog.Portal>
	)
}