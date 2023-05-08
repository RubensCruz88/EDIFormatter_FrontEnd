import { NextApiRequest, NextApiResponse } from "next"
import nextConnect from "next-connect"
import { FormatData } from './FormatData';
import { api } from '../../../lib/axios';
import { AxiosResponse } from "axios";

interface schemaProps {
	descricao: string,
	ativo: boolean,
	public: boolean,
	tipo: string,
	createdAt: Date,
	id: number,
	caractere?: string
}

interface FormatDataBody {
	rawText: string,
	schemaId: number
}

interface SchemaResponseProps extends AxiosResponse {
	data: schemaProps
}

const handler = nextConnect<NextApiRequest,NextApiResponse>({
	onError(err, req, res, next) {
		console.log(err)
		res.status(500).json({error: "internal server error"})
	},
	onNoMatch(req, res) {
		res.status(404).json({error: "page not found"})
	}
})

handler.post(async (req, res) => {
	const { rawText, schemaId } = req.body as FormatDataBody

	const schemaResponse: SchemaResponseProps = await api.get(`/schemas/${schemaId}`)

	if(!schemaResponse.data) {
		return ""
	}

	const textToArray = rawText.split(/\r?\n/)

	const { tipo, caractere } = schemaResponse.data

	const formatData = new FormatData(textToArray)

	if(tipo === 'caractere') {
		if(!caractere) {
			return ""
		}

		const formattedText = formatData.formatByCharacter(caractere)

		const formattedBodyToSpreadsheet = formattedText.body.map( row => {
			const rowToSpreasheet = row.map( column => {
				return {value: column}
			})
	
			return rowToSpreasheet
		})

		return res.status(202).json({spreadsheet: formattedBodyToSpreadsheet})
	}


	// const formattedHeaderToSpreadsheet = formattedData.header.map(column => {
	// 	return {value: column}
	// })


	// const spreadsheet = []
	// spreadsheet.push(formattedHeaderToSpreadsheet)
	// formattedBodyToSpreadsheet.map(row => spreadsheet.push(row))

	return res.status(202).json({teste:  "TESTE"})
})

export default handler
