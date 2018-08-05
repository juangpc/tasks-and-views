const express = require('express');
const router = express.Router();

const utils = require('./groups.utils');

router.get('/all/:id',utils.getAllGroups);
router.get('/:id',utils.getOneGroup);
router.post('/new',utils.createGroup);
router.put('/:id',utils.updateGroup);
router.delete('/:id',utils.deleteGroup);

module.exports=router;
