import { api } from "@/lib/axios";
import { createContext, ReactNode, useState } from "react";

interface NewRule {
	descricao: string;
	tamanho: number;
}

interface Rules {
	// esquemaID: Number;
	id: Number;
	sequencia: string;
	// inicial: Number;
	// final: Number;
	tamanho: Number;
	// tipo: 'caractere' | 'data' | 'numero';
	descricao: string;
}

interface SchemaIdContextType {
	rules: Rules[]
	addNewRule: (newRule: NewRule) => void
	deleteRule: (sequence: string) => void
	reorderRules: (from: number, to: number) => void
	saveRules:	() => void
}

interface SchemaIdContextProviderProps {
	children: ReactNode
	initialData: Rules[]
}

export const SchemaIdContext = createContext({} as SchemaIdContextType) 

export function SchemaIdContextProvider({ children, initialData }: SchemaIdContextProviderProps) {
	const [rules,setRules] = useState<Rules[]>(initialData)

	function addNewRule(newRule: NewRule) {
		const { descricao, tamanho} = newRule

		const lastSequence = parseInt(rules[rules.length - 1].sequencia)
		const newSequence = (lastSequence + 1).toString()

		const novaRegra: Rules = {
			id: 1,
			sequencia: newSequence,
			tamanho,
			descricao
		}
		
		setRules([...rules,novaRegra])
	}

	function deleteRule(sequence: string) {
		const existRule = rules.filter(rule => rule.sequencia !== sequence)

		setRules(existRule)
	}

	function reorderRules(from: number, to: number) {
		const novasRegras = [...rules]
		const dragged = novasRegras[from];
		
		novasRegras.splice(from, 1)
	
		novasRegras.splice(to, 0, dragged)
	
		setRules(novasRegras)
	}


	async function saveRules() {
		const orderedRules = rules.map((rule,index) => {
			rule.sequencia = (index + 1).toString();

			return rule
		})

		const formattedRules: Rules[] = []

		for await (const rule of orderedRules){
			if(rule.id){
				const response = await api.put(`/regras/${rule.id}`,rule)

				formattedRules.push(response.data)
			} else {
				const response = await api.post(`/regras/`,rule)

				formattedRules.push(response.data)
			}
		} 

		setRules(formattedRules)

	}

	return (
		<SchemaIdContext.Provider value={{ rules, addNewRule, deleteRule, reorderRules, saveRules }}>
			{children}
		</SchemaIdContext.Provider>
	)
}
