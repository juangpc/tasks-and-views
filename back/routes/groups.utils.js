const View = require('../models/View');
const Group = require('../models/Group');
const Task = require('../models/Task');

exports.getAllGroups = function (req, res, next) {
  const viewId = req.params.id;
  View.findById(viewId)
    .populate('groups')
    .then(v => res.status(200).json(v.groups))
    .catch(err => res.status(500).json(err));
}

exports.getOneGroup = function (req, res, next) {
  Group.findById(req.params.id)
    .populate('tasks')
    .then(g => res.status(200).json(g))
    .catch(e => res.status(500).json(e));
}

exports.createGroup = function (req, res, next) {
  const { viewId, color, name } = req.body;
  View.findById(viewId)
    .then(v => {
      console.log(v);
      const newGroup = new Group({ name, color, view: v._id });
      newGroup.save().then(
        ng => {
          console.log('nuevo grupo creado');
          console.log(ng);
          View.findByIdAndUpdate(v._id, { $addToSet: { groups: ng } }, (err, d) => {
            if (err) {
              console.log(err);
              return res.status(500).json(err);
            } else {
              View.findById(viewId)
                .populate('groups')
                .then(v => res.status(200).json(v));
            }
          });

        }
      )
    })
}

exports.updateGroup = function (req, res, next) {
  console.log('updating group');
  Group.findByIdAndUpdate(req.params.id, req.body, { new: false }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'problem updating the group' });
    }
    console.log(data);
    View.findById(req.body.view)
      .populate('groups')
      .then(v => res.status(200).json(v.groups))
      .catch(e => res.status(500).json(e));
  });

}

exports.deleteGroup = function (req, res, next) {
  // console.log(req.params.id);
  Group.findById(req.params.id)
    .then((g) => {
      console.log(g);
      View.findById(g.view)
        .then(v => {
          console.log(v.groups);
          v.groups.remove(g._id);
          v.save();
          Group.findByIdAndRemove(g._id)
            .then(() => {
              console.log('Group borrado');
              return res.status(200).json({ message: 'group deleted' });
            });
        })
    })
    .catch(e => {
      console.log('problema al borrar');
      res.status(500).json(e);
    });
}

