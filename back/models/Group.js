const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  color: String,
  view: {type: Schema.Types.ObjectId,ref:'View'},
  board: {type: Schema.Types.ObjectId,ref:'Board'},
  tasks: [{type: Schema.Types.ObjectId,ref:'Task'}]
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
