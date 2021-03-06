const Composition = require('../models/composition');

module.exports = {
  create,
  index,
  update,
  deleteComposition
}

async function create(req, res) {

  try {
    let composition = await Composition.create({
      user: req.user,
      title: req.body.title,
      capo: req.body.capo,
      text: req.body.text,
      notes: req.body.notes
    })
    composition = await composition.populate('user')

    res.status(201).json({composition: composition})
  } catch(err){
    console.log(err, "Error (create ctrl)")
    res.status(400).json({err})
  }
}


async function update(req, res){

  try {
    const updatedComposition = await Composition.findByIdAndUpdate(
      req.body._id, {
      user: req.user,
      title: req.body.title,
      capo: req.body.capo,
      text: req.body.text,
      notes: req.body.notes
    }).exec()

    res.status(201).json(updatedComposition)

  } catch(err){
    console.log(err, "Error (update ctrl)")
    res.status(400).json({err})
  }
}


async function index(req, res) {
  try {
    const compositions = await Composition.find({user: req.user._id});
    res.status(200).json({compositions: compositions});
  } catch(err) {
    res.status(400).json({err})
  }
}

async function deleteComposition(req, res){
  try {
    console.log(req.params.compId, "<--- compId to be deleted")
    const success = await Composition.deleteOne({_id: req.params.compId})
    res.status(200).json(success);
  }catch(err){
    res.status(400).json({err})
  }
}