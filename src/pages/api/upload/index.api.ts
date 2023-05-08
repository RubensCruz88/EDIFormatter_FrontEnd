import type { NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import { readFileSync, unlink } from 'fs';

interface RequestUpload extends NextApiRequest{
	file: any
}


const upload = multer({
	storage: multer.diskStorage({
		destination: './public/uploads',
		filename: (req, file, callback) => {
			const now = new Date()
			const convertedDate = now.toLocaleDateString()
			const arrayOfDate = convertedDate.split("/")
			const dateFormatted = arrayOfDate[2] + arrayOfDate[1] + arrayOfDate[0]
			const convertedTime = now.toLocaleTimeString()
			const timeFormatted = convertedTime.replaceAll(":","")

			return callback(null, `${dateFormatted}_${timeFormatted}_${file.originalname}`)
		}
	})
})

const handler = nextConnect<NextApiRequest,NextApiResponse>({
	onError(err, req, res, next) {
		console.log(err)
		res.status(500).json({error: "internal server error"})
	},
	onNoMatch(req, res) {
		res.status(404).json({error: "page not found"})
	}
})

handler.use(upload.single("file"))

handler.post( (req: RequestUpload, res) => {
	const { file } = req

	if(file.filename){
		const fileOnString = readFileSync(`./public/uploads/${file.filename}`, 'utf8')

		unlink(`./public/uploads/${file.filename}`,(err) => {
			if(err) {
				console.log(err)
			}
		})

		return res.status(200).json({text: fileOnString})
	}

})

export default handler

export const config = {
	api: {
	  bodyParser: false, // Disallow body parsing, consume as stream
	},
  };