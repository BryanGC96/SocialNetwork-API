const Thought = require('../models/Thought');

module.exports = {
    // Create reaction on a single thought.
    async createReaction(req, res) {
        try {
            const {reactionBody, username } = req.body;
            const { thoughtId } = req.params;

            // Find the thought by thoughtId
            const thought = await Thought.findById(thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }

            // Creates the new reaction in the array.
            thought.reactions.push({ reactionBody, username });
            await thought.save();

            res.status(201).json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const { thoughtId, reactionId } = req.params;

            // Finds thought by 'thoughtId'
            const thought = await Thought.findById(thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }

            // Find the index of the reaction with the given reactionId in the thought's reactions array
            const reactionIndex = thought.reactions.findIndex(reaction => reaction._id.toString() === reactionId);
            if (reactionIndex === -1) {
                return res.status(404).json({ message: 'Reaction not found' });
            }

            // Removes the reaction from the thought's reaction array.
            thought.reactions.splice(reactionIndex, 1);
            await thought.save();

            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    }
};