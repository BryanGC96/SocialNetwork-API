const { Schema, model } = require('mongoose');

const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/  // RegEx to validate the match of an email.
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
);

userSchema // Creates 'freindCout' to acces the property of the User, by using 'this' refering to it.
    .virtual('friendCount')
    .get(function() {
        return `${this.friends.length}`;
    });

const User = model('user', userSchema); // Initialize the 'User' model.

module.exports = User;