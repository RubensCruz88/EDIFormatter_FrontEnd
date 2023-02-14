import { api } from '@/lib/axios';
import { useState } from 'react';
import { Container, MenuBar } from '@/styles/pages/esquemas/esquemaID';
import { Header } from './styles';
import { Download, FloppyDisk, Upload } from 'phosphor-react';
import { AddNewRule } from '@/components/EsquemaId/AddNewRule';
import { DeleteRule } from '@/components/EsquemaId/DeleteRule';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Rule } from '@/components/EsquemaId/Rule';
import { GetServerSideProps } from 'next';

interface NewRule {
	descricao: string;
	tamanho: number;
}

interface Schema {
	// esquemaID: Number;
	id: Number;
	sequencia: string;
	// inicial: Number;
	// final: Number;
	tamanho: Number;
	// tipo: 'caractere' | 'data' | 'numero';
	descricao: string;
}

interface ResponseProps {
	data: Schema[]
}

interface PageProps {
	regrasAPI: Schema[]
}

export default function Esquema({ regrasAPI }: PageProps) {
	const [schemas,setSchemas] = useState<Schema[]>(regrasAPI)

	function addNewRule(data: NewRule) {
		const { descricao, tamanho} = data

		const ultimaSequencia = parseInt(schemas[schemas.length - 1].sequencia)
		const novaSequencia = (ultimaSequencia + 1).toString()

		const novaRegra: Schema = {
			id: 1,
			sequencia: novaSequencia,
			tamanho,
			descricao	
		}
		
		setSchemas([...schemas,novaRegra])
	}

	function deleteRule(sequencia: string) {
		const novasRegras = schemas.filter(schema => schema.sequencia !== sequencia)

		setSchemas(novasRegras)
	}

	async function saveRules() {
		const regrasSequenciaOrdenada = schemas.map((schema,index) => {
			schema.sequencia = (index + 1).toString();

			return schema
		})

		const regrasRetorno: Schema[] = []

		for await (const regra of regrasSequenciaOrdenada){
			if(regra.id){
				const response = await api.put(`/regras/${regra.id}`,regra)

				regrasRetorno.push(response.data)
			} else {
				const response = await api.post(`/regras/`,regra)

				regrasRetorno.push(response.data)
			}
		} 

		localStorage.removeItem('schema');

		setSchemas(regrasRetorno)

	}

	function move(from: number, to: number) {
		const novasRegras = [...schemas]
		const dragged = novasRegras[from];
		
		novasRegras.splice(from, 1)

		novasRegras.splice(to, 0, dragged)

		setSchemas(novasRegras)
	}


	return (
		<Container>
			<Header>Layout do Esquema</Header>

			<MenuBar>
				<AddNewRule addNewRule={addNewRule}/>
				<button disabled><Upload />Importar</button>
				<button disabled><Download />Exportar</button>
				<button onClick={saveRules}><FloppyDisk />Salvar</button>
			</MenuBar>

			<DndProvider backend={HTML5Backend}>
				<div className='ruleRow'>
					{schemas.map((schema, index) => {
							return (
								<Rule regra={schema} index={index} move={move} />
							)
					})}
				</div>
			</DndProvider>

		</Container>
	)

}

export const getServerSideProps: GetServerSideProps = async (props) => {
	const { query } = props
	const esquemaID = query.id

	const response: ResponseProps = await api.get(`/regras`,{
		params: {
			esquemaID,
			_sort: 'sequencia'
		}
	});

	return {
		props: {
			regrasAPI: response.data
		}
	}
}