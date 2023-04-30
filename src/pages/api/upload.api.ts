import type { NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({
	storage: multer.diskStorage({
		destination: './public/uploads',
		filename: (req, file, callback) => callback(null, file.originalname)
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

handler.post((req, res) => {
	return res.send(202)
})

export default handler

export const config = {
	api: {
	  bodyParser: false, // Disallow body parsing, consume as stream
	},
  };