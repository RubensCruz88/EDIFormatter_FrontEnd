import { api } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult, resetServerContext } from 'react-beautiful-dnd';
import { Container, MenuBar, Row } from '@/styles/pages/esquemas/esquemaID';
import { Header } from './styles';
import { Download, FloppyDisk, Pencil, Plus, Trash, Upload } from 'phosphor-react';
import { AddNewRule } from '@/components/EsquemaId/AddNewRule';
import { DeleteRule } from '@/components/EsquemaId/DeleteRule';

interface NewRule {
	descricao: string;
	tamanho: number;
}

interface Regra {
	// esquemaID: Number;
	id?: Number;
	sequencia: string;
	// inicial: Number;
	// final: Number;
	tamanho: Number;
	// tipo: 'caractere' | 'data' | 'numero';
	descricao: string;
}

interface EsquemaProps {
	id: string;
	dados: Regra[]
}

interface ResponseProps {
	data: Regra[]
}

export default function Esquema({ id }: EsquemaProps) {
	const [regras,setRegras] = useState<Regra[]>([])

	//Função necessária para usar DnD com SSG
	resetServerContext()

	useEffect(() => {
		const getData = async () => {
			const response: ResponseProps = await api.get(`/regras`,{
				params: {
					id,
					_sort: 'sequencia'
				}
			});

			setRegras(response.data)
		}

		const itensStorage = localStorage.getItem('schema')

		if(itensStorage) {
			const regraFormatadas = JSON.parse(itensStorage)

			setRegras(regraFormatadas)
		} else {
			getData()
		}

	},[])

	useEffect(() => {
		localStorage.setItem('schema', JSON.stringify(regras) )
	},[regras])

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result

		if(!destination) return

		const items = Array.from(regras)
		const [ newOrder ] = items.splice(source.index, 1)

		items.splice(destination.index, 0, newOrder)

		setRegras(items)

	}

	function addNewRule(data: NewRule) {
		const { descricao, tamanho} = data

		const ultimaSequencia = parseInt(regras[regras.length - 1].sequencia)
		const novaSequencia = (ultimaSequencia + 1).toString()

		const novaRegra: Regra = {
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

	return (
		<Container>
			<Header>Layout do Esquema</Header>

			<MenuBar>
				<AddNewRule addNewRule={addNewRule}/>
				<button disabled><Upload />Importar</button>
				<button disabled><Download />Exportar</button>
				<button onClick={saveRules}><FloppyDisk />Salvar</button>
			</MenuBar>

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='regras'>
					{(provided) => (
						<div className='regras' {...provided.droppableProps} ref={provided.innerRef} placeholder={"teste"}>
							{regras.map(({sequencia, tamanho,descricao}, index) => {
								return (
									<Draggable key={sequencia} draggableId={sequencia} index={index}>
										{(provided1) => (
											<Row
												className='row'
												ref={provided1.innerRef} 
												{...provided1.draggableProps} 
												{...provided1.dragHandleProps}
											>
												<span title='Editar'><Pencil weight='bold'/></span>
												<DeleteRule sequencia={sequencia} deleteRule={deleteRule}>
													<span title='Excluir'><Trash weight='bold' size={16}/></span>
												</DeleteRule>
												<span title='Tamanho do campo' className='tamanho'>{tamanho.toString()}</span>
												<span title='Descrição' className='descricao'>{descricao}</span>
												{/* {provided.placeholder} */}
											</Row>
										)}
									</Draggable>
								)
							})}
						</div>
					)}
				</Droppable>
			</DragDropContext> 

		</Container>
	)

}
