import { useContext } from 'react';
import { SchemasContext } from '@/pages/schemas/contexts/SchemasContext';
import { SchemaRow } from '../SchemaRow';

export default function SchemasBody() {
	const { schemas  } = useContext(SchemasContext)

	return (
		<div className='wrapper'>
			{schemas.map(schema => {
				return (
					<SchemaRow 
						key={schema.id} 
						schema={schema} 
					/>
				)							
			})}
		</div>
	)	
} 