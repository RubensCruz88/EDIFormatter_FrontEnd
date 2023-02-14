import { api } from "@/lib/axios";
import { createContext, ReactNode, useState } from "react";

interface Schema {
	id: string,
	descricao: string,
	ativo: Boolean,
	publico: Boolean,
	createdAt: Date,
	tipo: 'posicao' | 'caractere'
}

interface NewSchema {
	descricao: string
}

interface SchemasContextType {
	schemas: Schema[]
	addNewSchema: (newSchema: NewSchema) => void
	deleteSchema: (id: string) => void
	handleActiveSchema: (id: string) => void 
}

export const SchemasContext = createContext({} as SchemasContextType)

interface SchemasContextProviderProps {
	children: ReactNode
	initialData: Schema[]
}

export function SchemasContextProvider({ children, initialData }: SchemasContextProviderProps) {
	const [schemas,setSchemas] = useState<Schema[]>(initialData)

	async function addNewSchema(newSchema: NewSchema) {
		const { descricao } = newSchema

		const response = await api.post('/schemas',{
			descricao,
			ativo: true,
			publico: true,
			createdAt: new Date()
		})

		if(response.status == 201){
			setSchemas(state => [...state, response.data])
		} else {
			alert('Erro ao gravar esquema')
		}
	}

	async function deleteSchema(id: String) {
		const response = await api.delete(`/schemas/${id}`)

		if (response.status === 200){
			const novosEsquemas = schemas.filter(schema => schema.id !== id)

			setSchemas(novosEsquemas)
		}
	}

	async function handleActiveSchema(id: string) {
		const tempEsquemas = [...schemas]
		const esquemaAtualIndice = tempEsquemas.findIndex( esquema => esquema.id === id);

		if (esquemaAtualIndice >= 0) {
			const ativo = !schemas[esquemaAtualIndice].ativo
			schemas[esquemaAtualIndice].ativo = ativo

			const response = await api.patch(`/schemas/${id}`,{
				ativo
			});

			if(response.status === 200) {
				setSchemas(tempEsquemas);
			}
		}
	}

	return (
		<SchemasContext.Provider value={{ schemas, addNewSchema, deleteSchema, handleActiveSchema }}>
			{children}
		</SchemasContext.Provider>
	)
}
