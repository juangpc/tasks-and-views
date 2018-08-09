const Group = require('../models/Group');
const Task = require('../models/Task');

// router.get('/all/:id',utils.getAllTasks);
// router.get('/allinboard/:id',utils.getAllTasksInBoard);
// router.get('/:id',utils.getOneTask);
// router.post('/new',utils.createTask);
// router.put('/:id',utils.updateTask);
// router.delete('/:id',utils.deleteTask);

exports.getAllTasks = function (req, res, next) {
  console.log(`geting all tasks for group: ${req.params.id}`)
  Group.findById(req.params.id)
    .populate('tasks')
    .then(g => {
      // console.log(g);
      return res.status(200).json(g.tasks);
    })
    .catch(err => res.status(500).json(err));
}

exports.getAllTasksInBoard = function (req, res, next) {
  const boardId = req.params.id;
  Task.find({ board: boardId }, (e, tasks) => {
    if (e) {
      res.status(500).json(e);
    }
    res.status(200).json(tasks);
  })
}

exports.getOneTask = function (req, res, next) {
  Task.findById(req.params.id)
    .then(t => res.status(200).json(t))
    .catch(e => res.status(500).json(e));
}

exports.createTask = function (req, res, next) {
  // console.log(req.body);
  const { group, board, name } = req.body;
  const newTask = new Task({
    name,
    board,
    description: '',
    active: true
  });
  newTask.save().then(nT => {
    Group.update({ _id: group }, { $addToSet: { tasks: nT } }, (err, g) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        res.status(200).json(g);
      }
    })
  })
}

exports.updateTask = function (req, res, next) {
  Task.findByIdAndUpdate(req.params.id, req.body, { new: false }, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'problem updating task' });
    } else {
      res.status(200).json(data);
    }
  });
}

exports.deleteTask = function (req, res, next) {
  const taskId = req.params.id;
  Task.findByIdAndRemove(taskId)
    .then(() => {
      console.log('task deleted');
      return res.status(200).json({ message: 'task deleted' });
    })
    .catch(e => res.status(500).json(e));
}
