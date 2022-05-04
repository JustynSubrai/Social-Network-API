const req = require('express/lib/request');
const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path:'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(thoughts => res.json(thoughts))
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Something went wrong' });
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(thought => res.json(thought))
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Something went wrong' });
            });
    },
    createThought({ body, res }) {
        Thought.create(body)
        .then(thoughts => res.json(thoughts))
        .catch(err => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(thought => {
                if (!thought) {
                    return res.status(404).json({ message: 'Thought not found' });
                }
                res.json(thought);
            })
            .catch(err => res.json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(thought => res.json(thought))
            .catch(err => res.json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, { $push: { reactions: body } }, { new: true })
            .then(thought => {
                if (!thought) {
                    return res.status(404).json({ message: 'Thought not found' });
                }
                res.json(thought);
            })
            .catch(err => res.json(err));
    },
    
    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, { $pull: { reactions: body } }, { new: true })
            .then(thought => {
                if (!thought) {
                    return res.status(404).json({ message: 'Thought not found' });
                }
                res.json(thought);
            })
            .catch(err => res.json(err));
    }

};

module.exports = thoughtController;
