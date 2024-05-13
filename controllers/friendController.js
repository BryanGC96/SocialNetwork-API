const User = require('../models/User');

module.exports = {
    // Adds friend to a users friendlist
    async addFriend(req, res) {
        try {
            const { userId, friendId } = req.params;

            // Finds user by userId
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Checks if the friendId is allready in the user's friend list.
            if (user.friends.includes(friendId)) {
                return res.status(400).json({ message: 'Friend already exist in the user\'s friend list' });
            }

            //Adds the friendId to the user's friend list.
            user.friends.push(friendId);
            await user.save();

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Removes/DELETE friend  from a user friendlist.
    async removeFriend(req, res) {
        try {
            const { userId, friendId } = req.params;

            const user = await User.findById(userId);
            if(!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Checks if the friendId exist in the user's friend list
            const friendIndex = user.friends.indexOf(friendId);
            if (friendIndex === -1) {
                return res.status(400).json({ message: 'Friend not found in user\'s friend list' });
            }

            user.friends.splice(friendIndex, 1); // 'Splice' removes or replace stuff from an array.
            await user.save();

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
