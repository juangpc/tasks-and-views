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
  views: [{
    type: Schema.Types.ObjectId,
    ref: 'View'
  }]
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;


//middle ware for all de deletions
//   Person.pre('remove', function(next) {
//     // Remove all the assignment docs that reference the removed person.
//     this.model('Assignment').remove({ person: this._id }, next);
// });