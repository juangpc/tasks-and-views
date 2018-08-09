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
      // console.log(b);
      // console.log(b.views);
      return res.status(200).json(b.views);
    })
    .catch(err => res.status(500).json(err))
}

exports.getOneView = function (req, res, next) {
  const viewId = req.params.id;
  View.findById(viewId)
    .then(v => res.status(200).json(v))
    .catch(err => res.status(500).json(err));
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
      const newView = new View({
        name,
        board
      });
      newView.save().then(
        nV => {
          console.log('nueva view creada');
          // console.log(nV);
          // const conditions = { _id: board, 'views.name': { $ne: name } };
          const conditions = { _id: board };
          const update = { $addToSet: { views: nV } };
          Board.update(conditions, update, (err, d) => {
            if (err) {
              console.log(err);
              return res.status(500).json(err);
            } else {
              Board.findById(board)
                .populate('views')
                .then(b => res.status(200).json(b));
            }
          });
        })
    })
}

exports.updateView = function (req, res, next) {
  console.log('updating board');
  // console.log(req.body);
  View.findByIdAndUpdate(req.params.id, req.body, { new: false }, (err, data) => {
    if (!err) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ message: 'problem updating the view' });
    }
  })
}

exports.deleteView = function (req, res, next) {
  View.findById(req.params.id)
    .then((v) => {
      Board.findById(v.board)
        .then(b => {
          // console.log(b.views)
          // console.log(b.views[5].equals(v._id));
          b.views.remove(v._id);
          b.save();
          // console.log(b.views)
          View.findByIdAndRemove(v._id).then();
        })
      return res.status(200).json({ message: 'View deleted' });
    })
    .catch(e => res.status(500).json(e));
}



