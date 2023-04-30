import Select from 'react-select';
import { Container, Form, Header } from "./styles";
import { GetServerSideProps } from 'next';
import { api, nextApi } from '@/lib/axios';
import { useState } from 'react';
import multer from 'multer';

interface SchemaResponse {
	id: number,
	descricao: string,
	ativo: boolean,
	publico: boolean,
	createdAt: Date,
	tipo: 'posicao' | 'caractere'
}

interface Schema {
	id: number,
	descricao: string
}

interface SchemaProps {
	schemas: Schema[]
}

interface SelectSchemaProps {
	value: string,
	label: string
}

export default function Format(props: SchemaProps) {
	const [file, setFile] = useState<File>()
	const [selectedSchema, setSelectedSchema] = useState<SelectSchemaProps | null>()
	const options = props.schemas.map(schema => {
		return {
			value: schema.id.toString(),
			label: schema.descricao
		}
	})
	
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		// const response = await nextApi.get('/hello')

		// console.log(response)
	}

	const onChangeFileInput = (event: any) => {
		console.log(event.target.value)
	}


	return (
		<Container>
			<Header>Formatar</Header>

			<Form onSubmit={handleSubmit}>
				<Select 
					placeholder="Selecione o esquema" 
					options={options} 
					onChange={(selectedValue) => setSelectedSchema(selectedValue)}
					isClearable
				/>
				<input type="file" onChange={onChangeFileInput}/>
				<button type="submit">Formatar</button>
				<textarea id="result" name="result" rows={4} cols={50} style={{border: '1px solid black', borderRadius: 6, padding: '1rem'}}>
					o resultado vai aqui por enqt
				</textarea>
			</Form>


		</Container>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	const response = await api.get('/schemas')
	const schemaResponse: SchemaResponse[] = response.data

	const schemas = schemaResponse.map((schema) => {
		const { id, descricao} = schema

		const formattedSchema = {
			id,
			descricao
		}

		return formattedSchema
	})

	return {
		props: {
			schemas
		}
	}
}
