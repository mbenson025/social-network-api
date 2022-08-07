const { User, Thought } = require('../models');
const express = require('express');

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find({})
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //get single user

  //create user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //delete user

  //add friend

  //destroy friend
};
module.exports = userController;
