const Composition = require('../models/composition');

const {v4: uuid4} = require('uuid')
const S3 = require("aws-sdk/clients/s3")
const s3 = new S3()

const BUCKET = process.env.BUCKET;

module.exports = {
	create, 
	index
}

function create(req, res) {
	console.log(req.body, "<---- req.body (ctrl create)", req.file, "<----- req.file (ctrl create)")

	const filePath = `${uuid4()}${req.file.originalname}`;
	const params = {Bucket: BUCKET, Key: filePath, Body: req.file.buffer}

	s3.upload(params, async function(err, data) {
		if(err) return res.status(400).json({err})

		try {
			let composition = await Composition.create({
				title: req.body.title,
				user: req.user,
				text: req.body.text,
				photoUrl: data.Location,
				notes: req.body.notes
			})

			composition = await composition.populate('user')

			res.status(201).json({composition})
		} catch(err){
			console.log(err, "Error (create ctrl)")
			res.status(400).json({err})
		}
	})
}

async function index(req, res) {
	try {
		const compositions = await Composition.find({}).populate('user').exec();
		res.status(200).json({compositions: compositions});
	} catch(err) {
		res.status(400).json({err})
	}
}