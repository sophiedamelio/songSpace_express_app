const Composition = require('../models/composition');

const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3(); // initialize the S3 constructor

const BUCKET = process.env.BUCKET;

module.exports = {
    create,
    index,
	update,
	deleteComposition
}

function create(req, res) {
	//console.log(req, "<--- req in comp ctrl")
	//console.log(req.body, "<---- req.body (ctrl create)", req.file, "<----- req.file (ctrl create)")
	console.log(req.file, "<--- req.file")

	const filePath = `${uuidv4()}${req.file.originalname}`;
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


function update(req, res){
	console.log(req.file, "<--- req.file")

	const filePath = `${uuidv4()}${req.file.originalname}`;
	const params = {Bucket: BUCKET, Key: filePath, Body: req.file.buffer}

	s3.upload(params, async function(err, data) {
		if(err) return res.status(400).json({err})

		try {
			let composition = await Composition.updateOne({
				title: req.body.title,
				user: req.user,
				text: req.body.text,
				photoUrl: data.Location,
				notes: req.body.notes
			})

			composition = await composition.populate('user')

			res.status(201).json({composition})
		} catch(err){
			console.log(err, "Error (update ctrl)")
			res.status(400).json({err})
		}
	})
}


async function index(req, res) {
	try {
		const compositions = await Composition.find({user: req.user._id});
		console.log(compositions, "<-- compositions")
		//console.log(user, "<--- user in the comp ctrl index")
		console.log(req.user._id, "<--- req.user._id in the comp ctrl index")

		res.status(200).json({compositions: compositions});
	} catch(err) {
		res.status(400).json({err})
	}
}

async function deleteComposition(req, res){
	console.log(req, "<--- req.body in the compositions ctrl")
	// not finding the id or the composition properly, req.body is empty
	//if(!req.params)
	try {
		//const composition = Composition.find({'_id': req.params.id})
		console.log(req.params.id, "<--- id to be deleted")
		Composition.deleteOne({_id: req.params.id})
	}catch(err){
		res.status(400).json({err})
	}
}