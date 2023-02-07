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

interface Regra {
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
	data: Regra[]
}

interface PageProps {
	regrasAPI: Regra[]
}

export default function Esquema({ regrasAPI }: PageProps) {
	const [regras,setRegras] = useState<Regra[]>(regrasAPI)

	function addNewRule(data: NewRule) {
		const { descricao, tamanho} = data

		const ultimaSequencia = parseInt(regras[regras.length - 1].sequencia)
		const novaSequencia = (ultimaSequencia + 1).toString()

		const novaRegra: Regra = {
			id: 1,
			sequencia: novaSequencia,
			tamanho,
			descricao	
		}
		
		setRegras([...regras,novaRegra])
	}

	function deleteRule(sequencia: string) {
		const novasRegras = regras.filter(regra => regra.sequencia !== sequencia)

		setRegras(novasRegras)
	}

	async function saveRules() {
		const regrasSequenciaOrdenada = regras.map((regra,index) => {
			regra.sequencia = (index + 1).toString();

			return regra
		})

		const regrasRetorno: Regra[] = []

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

		setRegras(regrasRetorno)

	}

	function move(from: number, to: number) {
		const novasRegras = [...regras]
		const dragged = novasRegras[from];
		
		novasRegras.splice(from, 1)

		novasRegras.splice(to, 0, dragged)

		setRegras(novasRegras)
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
					{regras.map((regra, index) => {
							return (
								<Rule regra={regra} index={index} move={move} />
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