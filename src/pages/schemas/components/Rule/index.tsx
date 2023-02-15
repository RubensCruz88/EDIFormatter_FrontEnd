import { SchemaIdContext } from "@/pages/schemas/contexts/SchemaIdContext";
import { Pencil, Trash, DotsSixVertical } from "phosphor-react";
import { useContext, useRef } from "react";
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
	rule: Rule,
	index: number,
}

export function Rule({ rule, index }: RuleProps) {
	const { reorderRules } = useContext(SchemaIdContext)
	const ref = useRef<HTMLDivElement>(null);
	const HTMLdropRef = useRef<HTMLDivElement>(null)
	const id = rule.id

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

			reorderRules(draggedIndex, targetIndex)

			item.index = targetIndex
		}
	})

	dragRef(ref)
	dropRef(HTMLdropRef)

	return (
		<Row ref={HTMLdropRef} id={id.toString()} isDragging={isDragging} data-handler-id={handlerId}>
			<span title='Mover' className="draggable" ref={ref}><DotsSixVertical weight='bold'/></span>
			<button title='Editar' className="edit"><Pencil weight='bold'/></button>
			<DeleteRule sequence={rule.sequencia} >
				<button title='Excluir' className="delete"><Trash weight='bold' size={16}/></button>
			</DeleteRule>
			<span title='Tamanho do campo' className='fieldSize'>{rule.tamanho.toString()}</span>
			<span title='Descrição'>{rule.descricao}</span>

		</Row>
	)
}