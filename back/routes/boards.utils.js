const User = require('../models/User');
const Board = require('../models/Board');
const Group = require('../models/Group');
const Task = require('../models/Task');
const passport = require('passport');

exports.createBoard = function (req, res, next) {
  const { name, userId } = req.body;
  const newBoard = new Board({
    name,
    owner: userId,
    users: [userId]
  });

  newBoard.save().then(
    nB => {
      console.log('board guardado')
      Board.find({users:{$in : [userId]}})
        .then(bL=>{
          return res.status(200).json(bL)})
        .catch(err=>{
          return res.status(500).json(err);
        })
    }
  )
}

exports.getBoards = function (req, res, next) {
  const userId=req.params.id;
  Board.find({users:{$in : [userId]}})
    .populate('views')
    .then(bL=>{
      return res.status(200).json(bL)})
    .catch(err=>{
      return res.status(500).json(err);
    })
}

exports.updateBoard = function (req, res, next) {
  console.log(req.params.id);
  console.log(req.body);
  Board.findByIdAndUpdate(req.params.id,req.body,{new:false},(err,data)=>{
    if(!err){
      res.status(200).json(data);
    } else {
      res.status(500).json({message: 'problem updating data'});
    }
  })
}

exports.createNewView= function (req,res,next) {

}
// var arr = [];
// arr[0] = "Jani";
// arr[1] = "Hege";
// arr[2] = "Stale";
// arr[3] = "Kai Jim";
// arr[4] = "Borge";

// console.log(arr.join());
// arr.splice(2, 0, "Lene");
// console.log(arr.join());

exports.deleteBoard = function (req, res, next) {
  Board.findByIdAndRemove(req.params.id)
    .then(()=> {
      console.log('objeto borrado')
      return res.status(200).json({message:'board deleted'})})
    .catch((err)=>{
      console.log('problema al borrar')
      return res.status(500).json(err)});
}

exports.getOneBoard= function (req,res,next) {
  Board.findById(req.params.id)
    .populate('views')
    .then(b=> {
      console.log('recupearar solo un board');
      return res.status(200).json(b)
    })
    .catch(err=>{
      return res.status(500).json(err)
    });
}
