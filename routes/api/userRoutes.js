const router = require('express').Router();
const {
    getUsers,
    getSingleUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

/// /api/users/:userId
router.route('/:userId')
    .get(getSingleUserById)
    .put(updateUserById)
    .delete(deleteUserById); // C-R-U-D

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;

