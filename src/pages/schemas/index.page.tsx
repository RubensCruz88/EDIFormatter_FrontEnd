import { api } from '@/lib/axios';
import { GetServerSideProps } from 'next';
import { Plus } from 'phosphor-react';
import { useState } from 'react';
import { Container, SchemasContainer, Header } from './styles';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AddNewSchema } from './components/AddNewSchema';
import { SchemasContextProvider } from './contexts/SchemasContext';
import SchemasBody from './components/SchemasBody';

interface Schema {
	id: string,
	descricao: string,
	ativo: Boolean,
	publico: Boolean,
	createdAt: Date,
	tipo: 'posicao' | 'caractere'
}

interface SchemaProps {
	schemas: Schema[]
}

export default function Schemas(props: SchemaProps) {
	const [open, setOpen] = useState(false);

	return (
		<Container>
			<Header>Esquemas</Header>

			<SchemasContextProvider initialData={props.schemas}>
				<SchemasContainer>
					<Dialog.Root open={open} onOpenChange={setOpen}>
						<Dialog.Trigger asChild>
							<button className='adicionar'><Plus color="#00F"/></button>
						</Dialog.Trigger>

						<AddNewSchema />
					</Dialog.Root>

					<SchemasBody />
				</SchemasContainer>
			</SchemasContextProvider>

		</Container>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	const response = await api.get('/schemas')
	const schemas: Schema[] = response.data

	return {
		props: {
			schemas
		}
	}
}
