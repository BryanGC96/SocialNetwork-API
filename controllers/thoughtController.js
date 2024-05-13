const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {

    // Get all thoughts.
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single thought by its _id.
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with the requested ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new thought
    async createThought(req, res) {
        try {
            const { thoughtText, username, userId } = req.body;

            // Creates the thought.
            const newThought = await Thought.create({ thoughtText, username });

            // Pushes the created thought's _id to the associated user's thoughts array.
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            user.thoughts.push(newThought._id);
            await user.save();

            res.status(201).json(newThought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // Update a thought by its _id.
    async updateThoughtById(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                req.body,
                { new: true }
            );
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // Delete thought by its _id.
    async deleteThoughtById (req, res) {
        try {
            const deleteThought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!deleteThought) {
                return res.status(404).json({ message: 'No thought find with the requested Id' });
            }

            // Removes thought's _id from the associated user thought array.
            const user = await User.findById(deleteThought.userId);
            if (user) {
                user.thoughts.pull(deleteThought._id);
                await user.save();
            }

            res.json({ message: 'Thought deleted successfully' });
        } catch (err) {
            res.status(400).json(err);
        }
    }
};