import * as Dialog from '@radix-ui/react-dialog';
import { FloppyDisk, Plus, X } from 'phosphor-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Adicionar, CloseButton, Content, Overlay, SaveButton } from './styles';

interface RuleData {
	descricao: string;
	tamanho: number;
}

interface AddNewRuleProps {
	addNewRule: (data: RuleData) => void
}

export function AddNewRule({ addNewRule }: AddNewRuleProps) {
	const [open, setOpen] = useState(false);
	const { register, handleSubmit } = useForm<RuleData>()

	const submitNovaRegra: SubmitHandler<RuleData> = (data) => {
		addNewRule(data)
	}

	return (

		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<Adicionar className='adicionar'><Plus />Adicionar</Adicionar>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Overlay />

				<Content>
					<Dialog.Title>Nova Regra</Dialog.Title>

					<CloseButton>
						<X size={24}/>
					</CloseButton>

					<form onSubmit={handleSubmit(submitNovaRegra)}>
						<input type="text" placeholder='Descrição' required {...register('descricao')} />
						<input type="number" placeholder='Tamanho' required {...register('tamanho')} />

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