const express = require('express');
const router = express.Router();

const utils = require('./boards.utils');

router.get('/all/:id',utils.getBoards);
router.get('/:id',utils.getOneBoard);
router.post('/new',utils.createBoard);
router.put('/:id',utils.updateBoard);
router.delete('/:id',utils.deleteBoard);

module.exports=router;
