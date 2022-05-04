const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required'],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: "Email address is required",
        match: [/.+@.+..+/,
            "Please fill a valid email address",
        ],
    },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

userSchema.virtual('friendsCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;