import { api } from '@/lib/axios';
import { GetServerSideProps } from 'next';
import { Plus } from 'phosphor-react';
import { useState } from 'react';
import { Container, EsquemasContainer, Header } from './styles';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AddNewConfig } from '@/components/Esquemas/AddNewConfig';
import { SchemaRow } from '@/components/Esquemas/SchemaRow';

interface newSchema {
	descricao: string
}

interface Esquema {
	id: string,
	descricao: string,
	ativo: Boolean,
	publico: Boolean,
	createdAt: Date,
	tipo: 'posicao' | 'caractere'
}

interface EsquemaProps {
	esquemas: Esquema[]
}

export default function Esquemas(props: EsquemaProps) {
	const [open, setOpen] = useState(false);
	const [esquemas,setEsquemas] = useState<Esquema[]>(props.esquemas)

	async function addNewSchema(data: newSchema) {
		const { descricao } = data

		const response = await api.post('/esquemas',{
			descricao,
			ativo: true,
			publico: true,
			createdAt: new Date()
		})

		if(response.status == 201){
			setEsquemas(state => [...state, response.data])

			setOpen(false)
		} else {
			alert('Erro ao gravar esquema')
		}

	}

	async function deleteSchema(id: String) {
		const response = await api.delete(`/esquemas/${id}`)

		if (response.status === 200){
			const novosEsquemas = esquemas.filter(esquema => esquema.id !== id)

			setEsquemas(novosEsquemas)
		}
	}

	return (
		<Container>
			<Header>Esquemas</Header>

			<EsquemasContainer>
				<Dialog.Root open={open} onOpenChange={setOpen}>
					<Dialog.Trigger asChild>
						<button className='adicionar'><Plus color="#00F"/></button>
					</Dialog.Trigger>

					<AddNewConfig addNewSchema={addNewSchema} />

				</Dialog.Root>


				<div className='wrapper'>
					{esquemas.map(esquema => {
						return (
							<SchemaRow key={esquema.id} esquema={esquema} deleteSchema={deleteSchema}/>
						)							
					})}
				</div>
			</EsquemasContainer>

		</Container>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	const response = await api.get('/esquemas')
	const esquemas: Esquema[] = response.data

	return {
		props: {
			esquemas
		}
	}
}
