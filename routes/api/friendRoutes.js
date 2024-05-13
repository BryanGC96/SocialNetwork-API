const router = require('express').Router();
const { userController } = require('../../controllers/userController');

router.route('/:userId/friends/:friendId')
    .post(userController.addFriend)
    .delete(userController.removeFriend);

module.exports = router;