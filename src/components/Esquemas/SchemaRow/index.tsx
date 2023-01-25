import { useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ArrowDown, ArrowUp, Pencil, LockKey, LockKeyOpen } from 'phosphor-react';
import Link from 'next/link';
import { DeleteConfig } from '@/components/Esquemas/DeleteConfig';

import { Detalhes, Root } from './styles';

interface Schema {
	id: string,
	descricao: string,
	ativo: Boolean,
	publico: Boolean,
	createdAt: Date,
	tipo: 'posicao' | 'caractere'
}

interface SchemaProps {
	esquema: Schema,
	deleteSchema: (data: any) => Promise<void>;
}

export function SchemaRow({ esquema, deleteSchema }: SchemaProps) {
	const [open, setOpen] = useState(false)

	return (
		<Root open={open} onOpenChange={setOpen}>
			<div className='dadosLinha'>
				<Collapsible.Trigger>
					{open ? <ArrowUp weight='bold' size={20} /> : <ArrowDown weight='bold' size={20} />}
				</Collapsible.Trigger>

				<a>
					{esquema.ativo ? <LockKeyOpen weight='bold' color='#228C22'/>: <LockKey weight='bold' color='#8B0000'/>}
				</a>

				<Link href={`/esquemas/${esquema.id}`}>
					<Pencil weight='bold'/>
				</Link>

				<DeleteConfig schemaKey={esquema.id} deleteSchema={deleteSchema} />

				<span>{esquema.descricao}</span>
			</div>

			<Collapsible.Content>
				<Detalhes>
					<span>Tipo:</span>
					<span>{esquema.tipo}</span>
				</Detalhes>
			</Collapsible.Content>
		</Root>									
	)
}