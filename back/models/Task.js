const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: String,
  description: String,
  active: Boolean,
  board: [{type: Schema.Types.ObjectId,ref: 'Board'}]
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
