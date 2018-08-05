const Group = require('../models/Group');
const Task = require('../models/Task');

exports.getAllTasks = function (req,res,next) {
  const groupId = req.params.id;
  Group.findById(groupId)
    .pupulate('tasks')
    .then(g=>res.status(200).json(g))
    .catch(e=>res.status(500).json(e));
}

exports.getOneTask = function (req,res,next) {
  Task.findById(req.params.id)
    .then(t=>res.status(200).json(t))
    .catch(e=>res.status(500).json(e));
}

exports.createTask = function (req,res,next) {
  const {groupId,name} = req.body;
  Group.findById(groupId)
    .then(g=>{

    })
}

exports.updateTask = function (req,res,next) {

}

exports.deleteTask = function (req,res,next) {
  Task.findByIdAndRemove(req.params.id)
    .then(()=>{
      console.log('task deleted');
      return res.status(200).json({message:'task deleted'});
    })
    .catch(e=>res.status(500).json(e));
}
