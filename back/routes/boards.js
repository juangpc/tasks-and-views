const express = require('express');
const router = express.Router();

const utils = require('./boards.utils');

router.post('/new',utils.createBoard);
router.get('/one/:id',utils.getOneBoard);
router.get('/:id',utils.getBoards);
router.put('/:id',utils.updateBoard);
router.delete('/:id',utils.deleteBoard);

module.exports=router;
