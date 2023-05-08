import Select from 'react-select';
import { Container, Form, Header } from "./styles";
import { GetServerSideProps } from 'next';
import { api, nextApi } from '@/lib/axios';
import { useState } from 'react';
import SpreadSheet from 'react-spreadsheet';
import { AxiosResponse } from 'axios';

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

interface RuleProps {
	esquemaID: number,
	id: number,
	sequencia: string,
	descricao: string
}

interface RuleResponse extends AxiosResponse {
	data: RuleProps[]
}

export default function Format(props: SchemaProps) {
	const [spreadSheet,setSpreadSheet] = useState(null)
	const [file, setFile] = useState<File | null>()
	const [selectedSchema, setSelectedSchema] = useState<SelectSchemaProps | null>()
	const [textToFormat,setTextToFormat] = useState("")
	const [columnsTitles,setColumnsTitles] = useState([""])
	const options = props.schemas.map(schema => {
		return {
			value: schema.id.toString(),
			label: schema.descricao
		}
	})
	
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const rulesResponse: RuleResponse = await api.get(`/regras?esquemaID=${selectedSchema?.value}`)

		if(!rulesResponse.data){
			return ""
		}
		
		const spreadsheetHeader = rulesResponse.data.map(schema => schema.descricao)
		
		setColumnsTitles(spreadsheetHeader)

		if(file){
			const headers = {
				headers: {
					"Content-Type": "multipart/form-data",
				  }
			}
	
			const result = await nextApi.post('/upload',{file},headers)

			const formattedSpreadsheet = await nextApi.post('/formatData',{rawText: result.data.text, schemaId: selectedSchema?.value})

			setSpreadSheet(formattedSpreadsheet.data.spreadsheet)

		}

	}

	const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.files){
			setFile(event.target.files[0])
		}
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
				<input 
					type="file"
					onChange={onChangeFileInput}
				/>
				<textarea 
					id="result" 
					name="result" 
					rows={4} 
					cols={50} 
					placeholder='Digite o texto para ser formatado'
					value={textToFormat}
					onChange={(event) => setTextToFormat(event.target.value)}
				>
				</textarea>
				<button type="submit">Formatar</button>
			</Form>

			{ spreadSheet
				? <SpreadSheet data={spreadSheet} columnLabels={columnsTitles} />
				: null }

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
