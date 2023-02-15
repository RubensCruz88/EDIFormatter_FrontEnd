import { AddNewRule } from "@/pages/schemas/components/AddNewRule";
import { Rule } from "@/pages/schemas/components/Rule";
import { Download, FloppyDisk, Upload } from "phosphor-react";
import { useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SchemaIdContext } from "../../contexts/SchemaIdContext";
import { MenuBar } from "./styles";

export default function RulesBody() {
	const { rules, saveRules} = useContext(SchemaIdContext)

	return (
		<>
			<MenuBar>
				<AddNewRule />
				<button disabled><Upload />Importar</button>
				<button disabled><Download />Exportar</button>
				<button onClick={saveRules}><FloppyDisk />Salvar</button>
			</MenuBar>

			<DndProvider backend={HTML5Backend}>
				<div className='ruleRow'>
					{rules.map((rule, index) => {
							return (
								<Rule rule={rule} index={index} />
							)
					})}
				</div>
			</DndProvider>
		
		</>
	)
}