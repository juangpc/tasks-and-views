const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewSchema = new Schema({
  name: String,
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }]
});

const View = mongoose.model('View',viewSchema);
module.exports = View;
