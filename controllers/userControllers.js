const { User, Thought } = require('../models');

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .then((userDataDB) => res.json(userDataDB))
      .catch((err) => {
        console.error({ message: err });
        res.status(500).json(err);
      });
  },

  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .then((userDataDB) => {
        if (!userDataDB) {
          res.status(404).json({ message: 'No user found with this ID' });
          return;
        }
        res.json(userDataDB);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((userDataDB) => res.json(userDataDB))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userDataDB) => {
        if (!userDataDB) {
          res.status(404).json({ message: 'Cannot find user with this id' });
          return;
        }
        res.json(userDataDB);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  destroyUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((userDataDB) => {
        if (!userDataDB) {
          res.status(404).json({ message: 'this user does not exist' });
          return;
        }
        res.json(userDataDB);
      })
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then((fDataDB) => {
        !fDataDB
          ? res.status(404).json({ message: 'No friend found with this id' })
          : res.json(fDataDB);
      })
      .catch((err) => res.status(500).json(err));
  },

  destroyFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((fDataDB) => {
        if (!fDataDB) {
          res.status(404).json({ message: 'No friend found with this id' });
          return;
        }
        res.json(fDataDB);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
