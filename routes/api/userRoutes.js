const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  destroyUser,
  addFriend,
  destroyFriend,
} = require('../../controllers/userControllers.js');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:id').get(getUserById).put(updateUser).delete(destroyUser);

// /api/users/:userId/friends/:friendId
// router
//   .route('/:userId/friends/:friendId')
//   .post(addFriend)
//   .delete(destroyFriend);

module.exports = router;
