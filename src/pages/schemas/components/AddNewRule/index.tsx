import * as Dialog from '@radix-ui/react-dialog';
import { FloppyDisk, Plus, X } from 'phosphor-react';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SchemaIdContext } from '../../contexts/SchemaIdContext';
import { Add, CloseButton, Content, Overlay, SaveButton } from './styles';

interface RuleData {
	description: string;
	size: number;
}

interface Rule {
	tamanho: number;
	descricao: string;
}

export function AddNewRule() {
	const { addNewRule } = useContext(SchemaIdContext)
	const [open, setOpen] = useState(false);
	const { register, handleSubmit } = useForm<RuleData>()

	const submitNewRule: SubmitHandler<RuleData> = (data) => {
		const newRule: Rule = {
			descricao: data.description,
			tamanho: data.size
		}
		addNewRule(newRule)
	}

	return (

		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<Add><Plus />Adicionar</Add>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Overlay />

				<Content>
					<Dialog.Title>Nova Regra</Dialog.Title>

					<CloseButton>
						<X size={24}/>
					</CloseButton>

					<form onSubmit={handleSubmit(submitNewRule)}>
						<input type="text" placeholder='Descrição' required {...register('description')} />
						<input type="number" placeholder='Tamanho' required {...register('size')} />

						<SaveButton>
							<FloppyDisk />
							Salvar
						</SaveButton>
					</form>


				</Content>
			</Dialog.Portal>
		</Dialog.Root>

	)
}