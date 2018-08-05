const Board = require('../models/Board');
const View = require('../models/View');

// router.get('/all/:id',utils.getAllViews);
// router.get('/:id',utils.getOneView);
// router.post('/new',utils.createView);
// router.put('/:id',utils.updateView);
// router.delete('/:id',utils.deleteView);

exports.getAllViews = function (req, res, next) {
  const boardId = req.params.id;
  Board.findById(boardId)
    .populate('views')
    .then(b => {
      console.log(b);
      console.log(b.views);
    })
}

exports.getOneView = function (req, res, next) {
  const viewId = req.params.id;
  View.findById(viewId)
    .populate('groups')
    .then(v=> res.status(200).json(v))
    .catch(err=> res.status(500).json(err));
}

exports.createView = function (req, res, next) {
  const { board, name } = req.body;
  // console.log(name);
  // console.log(board);
    Board.findById(board)
    .populate('views')
    .then(b => {
      // console.log(b);
      // console.log(b.views);
      if(b.views.find(v=>v.name==name)==undefined){
        const newView = new View({
          name,
          board
        });
        newView.save().then(
          nV => {
            console.log('nueva view creada');
            console.log(nV);
            const conditions = { _id: board, 'views.name' : {$ne: name}};
            const update = {$addToSet: {views: nV}};
            Board.update(conditions,update,(err,d)=>{
              if(err){
                console.log(err);
                return res.status(500).json(err);
              }else{
                Board.findById(board)
                  .populate('views')
                  .then(b => res.status(200).json(b));
              }
            });
          })
      } else{
        console.log('error vista ya existe!!')
        return res.status(500).json({message:'error. vista ya existe!'});
      }
    })
}

exports.updateView = function (req, res, next) {

}

exports.deleteView = function (req, res, next) {
  View.findByIdAndRemove(req.params.id);
    .then(()=>{
      console.log('View borrado');
      return res.status(200).json({message:'View deleted'});
    })
    .catch(e=>res.status(500).json(e));
}



