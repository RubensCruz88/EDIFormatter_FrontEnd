import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, SaveButton } from './styles';
import { FloppyDisk, X } from 'phosphor-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext } from 'react';
import { SchemasContext } from '../../contexts/SchemasContext';

type Inputs = {
	descricao: string
}

export function AddNewSchema() {
	const { addNewSchema } = useContext(SchemasContext)
	const {register, handleSubmit } = useForm<Inputs>();

	const submitNewSchema: SubmitHandler<Inputs> = async (data) => {
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

				<form onSubmit={handleSubmit(submitNewSchema)} >
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