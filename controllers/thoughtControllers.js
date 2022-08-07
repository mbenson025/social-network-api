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
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //update thought
  //destroy thought
  //add reaction
  //destroy reaction
};

module.exports = thoughtController;
