const { User, Thought } = require('../models');

const thoughtController = {
  //get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((tDB) => res.json(tDB))
      .catch((err) => {
        console.error({ message: err });
        res.status(500).json(err);
      });
  },

  //get a thought by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((tDB) => {
        if (!tDB) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json(tDB);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  //add/create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((tDB) => res.json(tDB))
      .catch((err) => {
        console.error(err);
        return res.status(500).json(err);
      });
  },

  //update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((tDB) => {
        if (!tDB) {
          res.status(404).json({ message: 'No thought found to update' });
          return;
        }
        res.json(tDB);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  //destroy thought
  destroyThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((tDB) => {
        if (!tDB) {
          res.status(404).json({ message: 'this thought does not exist' });
          return;
        }
        res.json(tDB);
      })
      .catch((err) => res.status(500).json(err));
  },
  //add reaction
  addReaction(req, res) {
    // console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((rDB) =>
        !rDB
          ? res.status(404).json({ message: 'No reaction found with this id' })
          : res.json(rDB)
      )
      .catch((err) => res.status(500).json(err));
  },
  //destroy reaction
  destroyReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((rDB) =>
        !rDB
          ? res.status(404).json({ message: 'No thought found with that id' })
          : res.json(rDB)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
