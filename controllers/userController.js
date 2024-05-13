const { Thought } = require('../models');
const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {

    // Get all users.
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single user.
    async getSingleUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v') // Tracks the 'document version', to exclude that field from the query result.

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Post a new user.
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // Update a user by its ID.
    async updateUserById(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'No user found with that ID.' });
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // Delete User by its ID.
    async deleteUserById(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete({ _id: req.params.userId });
            if (!deletedUser) {
                return res.status(404).json({ message: 'No user found with that ID.'});
            }
            await Thought.deleteMany({ username: deletedUser.username });

            res.json({ message: 'User and associated thoughts deleted successfully' });
        } catch (err) {
            res.status(400).json(err);
        }
    }
};