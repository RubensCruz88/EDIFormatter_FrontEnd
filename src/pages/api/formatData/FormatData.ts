export class FormatData {
	rawText: string[]

	constructor(
		rawText: string[]
	){
		this.rawText = rawText
	}

	formatByCharacter(character: string) {
		const formattedText = this.rawText.map(line => {
			const columns = line.split(character)

			return columns
		})

		const formattedData = {
			body: formattedText
		}

		return formattedData
	}

}

