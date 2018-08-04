const express = require('express');
const router = express.Router();

const utils = require('./views.utils');

router.get('/all/:id',utils.getAllViews);
router.get('/:id',utils.getOneView);
router.post('/new',utils.createView);
router.put('/:id',utils.updateView);
router.delete('/:id',utils.deleteView);

module.exports=router;
