const View = require('../models/View');
const Group = require('../models/Group');
const Task = require('../models/Task');

exports.getAllGroups = function (req,res,next) {
  const viewId = req.params.id;
  View.findById(viewId)
    .populate('groups')
    .then(v=>res.status(200).json(v))
    .catch(err=>res.status(500).json(err));
}

exports.getOneGroup = function (req,res,next) {
  Group.findById(req.params.id)
    .populate('tasks')
    .then(g=>res.status(200).json(g))
    .catch(e=>res.status(500).json(e));
}

exports.createGroup = function (req,res,next) {
  const {viewId, name} = req.body;
  View.findById(viewId)
    .then(v =>{
      console.log(v);
      if(v.groups.find(g=>g.name==name)==undefined){
        const newGroup = new Group({name});
        newGroup.save().then(
          ng => {
            console.log('nuevo grupo creado');
            console.log(ng);
            View.findByIdAndUpdate(v._id,{$addToSet:{groups:ng}},(err,d)=>{
              if(err){
                console.log(err);
                return res.status(500).json(err);
              } else {
                View.findById(viewId)
                  .populate('groups')
                  .then(v=>res.status(200).json(v));
              }
            });

          }
        )
      } else {
        console.log('ya existe un grupo con este nombre');
        return res.status(500).json({message:'error group name already exists!'})
      }
    })
}

exports.updateGroup = function (req,res,next) {

}

exports.deleteGroup = function (req,res,next) {
  Group.findByIdAndRemove(req.parmas.id)
    .then(()=>{
      console.log('Group borrado');
      return res.status(200).json({message:'group deleted'});
    })
    .catch(e=>res.status(500).json(e));
}
