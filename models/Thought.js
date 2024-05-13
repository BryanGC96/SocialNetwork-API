const { Schema, model, default: mongoose } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

// Getter method to formar timestamp.
reactionSchema
    .set('toJSON', { getters: true, virtuals: true });

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    }
);

thoughtSchema
    .virtual('reactionSchema')
    .get(function() {
        return `${ this.reactions.length }`;
    })
    .set('toJSON', { getters: true, virtuals: true }); // Getter method to formar timestamp.

const Thought = model('thought', thoughtSchema);


module.exports = Thought;