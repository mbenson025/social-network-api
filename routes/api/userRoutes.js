const router = require('express').Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  destroyFriend,
} = require('../../controllers/userControllers.js');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
// router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
// router
//   .route('/:userId/friends/:friendId')
//   .post(addFriend)
//   .delete(destroyFriend);

module.exports = router;
