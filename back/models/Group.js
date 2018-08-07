const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  tasks: [{
    type: Schema.Types.ObjectId,
    ref:'Task'
  }]
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
