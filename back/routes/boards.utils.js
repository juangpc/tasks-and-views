const Board = require('../models/Board');

// router.get('/all/:id',utils.getBoards);
// router.get('/:id',utils.getOneBoard);
// router.post('/new',utils.createBoard);
// router.put('/:id',utils.updateBoard);
// router.delete('/:id',utils.deleteBoard);

exports.getBoards = function (req, res, next) {
  const userId=req.params.id;
  Board.find({users:{$in : [userId]}})
    // .populate('views')
    .then(bL=>{
      return res.status(200).json(bL)})
    .catch(err=>{
      return res.status(500).json(err);
    })
}


exports.getOneBoard= function (req,res,next) {
  Board.findById(req.params.id)
    // .populate('views')
    .then(b=> {
      console.log('recupearar solo un board');
      return res.status(200).json(b)
    })
    .catch(err=>{
      return res.status(500).json(err)
    });
}

exports.createBoard = function (req, res, next) {
  const { name, userId } = req.body;
  // console.log(name);
  // console.log(userId);
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

exports.updateBoard = function (req, res, next) {
  // console.log(req.params.id);
  // console.log(req.body);
  Board.findByIdAndUpdate(req.params.id,req.body,{new:false},(err,data)=>{
    if(!err){
      res.status(200).json(data);
    } else {
      res.status(500).json({message: 'problem updating data'});
    }
  })
}

exports.deleteBoard = function (req, res, next) {
  Board.findByIdAndRemove(req.params.id)
    .then(()=> {
      console.log('Board borrado');
      return res.status(200).json({message:'board deleted'});
    })
    .catch((err)=>{
      console.log('problema al borrar')
      return res.status(500).json(err)});
}

