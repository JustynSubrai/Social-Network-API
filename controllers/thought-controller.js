const { Thought, User } = require('../models/thought');

const thoughtController = {
    addThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.id },
                    { $push: { thoughts: _id } },
                    { new: true });
            })
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                res.json(user);
            })
            .catch(err => res.json(err));
    },
};
