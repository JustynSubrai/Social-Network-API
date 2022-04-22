const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 200
        },
        createdAt: {
            type: dateFormat,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {  
            virtuals: true,
            getters: true
        },
        id: false
    }
);

reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength:280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
});

reactionCount.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const  Thought = model('Thought', thoughtSchema);

module.exports = Thought;