import { Pencil, Trash, DotsSixVertical } from "phosphor-react";
import { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';
import { DeleteRule } from "../DeleteRule";
import { Row } from "./styles";

interface Rule {
	id: Number;
	sequencia: string;
	tamanho: Number;
	descricao: string;
}

interface RuleProps {
	regra: Rule,
	index: Number,
	move: (from: any, to: any) => void
}

export function Rule({ regra, index, move }: RuleProps) {
	const ref = useRef<HTMLDivElement>(null);
	const HTMLdropRef = useRef<HTMLDivElement>(null)
	const id = regra.id

	const [{isDragging},dragRef] = useDrag({
		type: 'Rule',
		item: { id, index},
		collect: monitor => ({
			isDragging: monitor.isDragging()
		})
	})

	const [{ handlerId }, dropRef] = useDrop({
		accept: 'Rule',
		collect: (monitor) =>{
			return {
				handlerId: monitor.getHandlerId()
			}
		},
		hover(item: any, monitor) {
			const draggedIndex = item.index;
			const targetIndex = index;

			if(draggedIndex === targetIndex) {
				return
			}

			const targetSize = ref.current?.getBoundingClientRect()
			const targetCenter = (targetSize!.bottom - targetSize!.top) / 2;

			const draggedOffset = monitor.getClientOffset();
			const draggedTop = draggedOffset!.y - targetSize!.top

			if(draggedIndex < targetIndex && draggedTop < targetCenter) {
				return
			}

			if(draggedIndex > targetIndex && draggedTop > targetCenter) {
				return
			}

			move(draggedIndex, targetIndex)

			console.log(item)

			item.index = targetIndex
		}
	})

	dragRef(ref)
	dropRef(HTMLdropRef)

	function deleteRule(sequencia: string) {
	}

	return (
		<Row ref={HTMLdropRef} id={id.toString()} isDragging={isDragging} data-handler-id={handlerId}>
			<span title='Mover' className="mover" ref={ref}><DotsSixVertical weight='bold'/></span>
			<button title='Editar' className="editar"><Pencil weight='bold'/></button>
			<DeleteRule sequencia={regra.sequencia} deleteRule={deleteRule}>
				<button title='Excluir' className="excluir"><Trash weight='bold' size={16}/></button>
			</DeleteRule>
			<span title='Tamanho do campo' className='tamanho'>{regra.tamanho.toString()}</span>
			<span title='Descrição' className='descricao'>{regra.descricao}</span>

		</Row>
	)
}