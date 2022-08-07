const { User, Thought } = require('../models');

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find({})
      .then((userDataDB) => res.json(userDataDB))
      .catch((err) => {
        console.error({ message: err });
        res.status(500).json(err);
      });
  },

  //get single user by id
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

  //create user
  createUser(req, res) {
    User.create(req.body)
      .then((userDataDB) => res.json(userDataDB))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //update user by id -(format act 26 appController.js)
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userDataDB) => {
        if (!userDataDB) {
          res.status(404).json({ message: 'Cannot find a user with this id' });
          return;
        }
        res.json(userDataDB);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //destroy a user
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

  //add friend

  //destroy friend
};
module.exports = userController;
