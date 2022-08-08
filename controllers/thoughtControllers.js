const { User, Thought } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .then((tDB) => res.json(tDB))
      .catch((err) => {
        console.error({ message: err });
        res.status(500).json(err);
      });
  },

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

  createThought(req, res) {
    Thought.create(req.body)
      .then((tDB) => res.json(tDB))
      .catch((err) => {
        console.error(err);
        return res.status(500).json(err);
      });
  },

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

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((rDB) =>
        !rDB
          ? res.status(404).json({ message: 'No reaction found with this id' })
          : res.json(rDB)
      )
      .catch((err) => res.status(500).json(err));
  },

  destroyReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reaction: { reactionId: req.params.reactionId } } },
      { new: true }
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
