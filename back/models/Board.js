const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Array,
    'default':[{name:'initial'}],
    name:String,
    groups: [{
      type: Schema.Types.ObjectId,
      ref: 'Group'
    }] 
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref:'Task'
  }]
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;

