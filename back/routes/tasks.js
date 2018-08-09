const express = require('express');
const router = express.Router();

const utils = require('./tasks.utils');

router.get('/all/:id',utils.getAllTasks);
router.get('/allinboard/:id',utils.getAllTasksInBoard);
router.get('/:id',utils.getOneTask);
router.post('/new',utils.createTask);
router.put('/:id',utils.updateTask);
router.delete('/:id',utils.deleteTask);

module.exports=router;
