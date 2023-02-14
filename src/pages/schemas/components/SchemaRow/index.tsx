import { useContext, useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ArrowDown, ArrowUp, Pencil, LockKey, LockKeyOpen } from 'phosphor-react';
import Link from 'next/link';
import { DeleteSchema } from '@/pages/schemas/components/DeleteSchema';

import { Details, Root, RowContainer } from './styles';
import { SchemasContext } from '../../contexts/SchemasContext';

interface Schema {
	id: string,
	descricao: string,
	ativo: Boolean,
	publico: Boolean,
	createdAt: Date,
	tipo: 'posicao' | 'caractere'
}

interface SchemaProps {
	schema: Schema,
}

export function SchemaRow({ schema }: SchemaProps) {
	const { handleActiveSchema } = useContext(SchemasContext)
	const [open, setOpen] = useState(false)

	function onHandleActiveSchema() {
		handleActiveSchema(schema.id)
	}

	return (
		<Root open={open} onOpenChange={setOpen}>
			<RowContainer>
				<Collapsible.Trigger>
					{open ? <ArrowUp weight='bold' size={20} /> : <ArrowDown weight='bold' size={20} />}
				</Collapsible.Trigger>

				<a onClick={onHandleActiveSchema}>
					{schema.ativo ? <LockKeyOpen weight='bold' color='#228C22'/>: <LockKey weight='bold' color='#8B0000'/>}
				</a>

				<Link href={`/schemas/${schema.id}`}>
					<Pencil weight='bold'/>
				</Link>

				<DeleteSchema schemaKey={schema.id} />

				<span>{schema.descricao}</span>
			</RowContainer>

			<Collapsible.Content>
				<Details>
					<span>Tipo:</span>
					<span>{schema.tipo}</span>
				</Details>
			</Collapsible.Content>
		</Root>									
	)
}