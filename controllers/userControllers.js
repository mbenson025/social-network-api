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

  //create user
  createUser(req, res) {
    User.create(req.body)
      .then((userDataDB) => res.json(userDataDB))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //delete a user

  //add friend

  //destroy friend
};
module.exports = userController;
