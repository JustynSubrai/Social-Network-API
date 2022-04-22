const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

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
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    thoughts: [{ _id, Thought }],
    friends: [{
        _id,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

friendsCount.virtual('friendsCount').get(function () {
    return this.friends.length;
});

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

// userSchema.path('email').validate(async (email) => {
//     const emailCount = await mongoose.models.users.countDocuments({ email })
//     return !emailCount;
// }, 'Email already exists');

const User = model('users', userSchema);

module.exports = User;