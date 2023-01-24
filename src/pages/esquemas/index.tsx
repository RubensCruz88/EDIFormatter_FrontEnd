import { api } from '@/lib/axios';
import { GetServerSideProps } from 'next';
import { ArrowDown, ArrowUp, Pencil, Trash, LockKey, LockKeyOpen, Plus } from 'phosphor-react';
import { useState } from 'react';
import { Container, EsquemasContainer, Header, TabelaEsquemas } from './styles';
import Link from 'next/link';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AddNewConfig } from '@/components/AddNewConfig';
import { DeleteConfig } from '@/components/DeleteConfig';

interface newSchema {
	descricao: string
}

interface Esquema {
	id: string,
	descricao: string,
	ativo: Boolean,
	publico: Boolean,
	createdAt: Date,
	isExpanded: Boolean,
	tipo: 'posicao' | 'caractere'
}

interface EsquemaProps {
	esquemas: Esquema[]
}

export default function Esquemas(props: EsquemaProps) {
	const [open, setOpen] = React.useState(false);
	const [esquemas,setEsquemas] = useState<Esquema[]>(props.esquemas)

	function handleDetalhes(id: string) {
		const esquema = esquemas.find(esquema => esquema.id === id)
	
		if(esquema) {
			esquema.isExpanded = !esquema.isExpanded

			setEsquemas([...esquemas])
		}
	}
	
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


				<TabelaEsquemas>
					<tbody>
						{esquemas.map(esquema => {
							return (
								<tr key={esquema.id} >
									<td><a onClick={() => handleDetalhes(esquema.id)}>{esquema.isExpanded ? <ArrowUp weight='bold' /> : <ArrowDown weight='bold' />}</a></td>
									<td>{esquema.ativo ? <LockKeyOpen weight='bold' color='#228C22'/>: <LockKey weight='bold' color='#8B0000'/>}</td>
									<td><Link href={`/esquemas/${esquema.id}`}><Pencil weight='bold'/></Link></td>
									<td>
										<DeleteConfig schemaKey={esquema.id} deleteSchema={deleteSchema}/>
									</td>
									<td>{esquema.descricao}</td>
									
								</tr>
							)							
						})}

					</tbody>
				</TabelaEsquemas>
			</EsquemasContainer>

		</Container>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	const response = await api.get('/esquemas')
	const responseEsquemas: Esquema[] = response.data

	const esquemas = responseEsquemas.map(esquema => {
		esquema.isExpanded = false

		return esquema
	})

	return {
		props: {
			esquemas
		}
	}
}
