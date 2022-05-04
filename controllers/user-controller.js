const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(users => res.json(users))
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Something went wrong getAlluser' });
            });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(user => res.json(user))
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Something went wrong' });
            });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(user => res.json(user))
            .catch(err => res.json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(user);
            })
            .catch(err => res.json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(user => res.json(user))
            .catch(err => res.json(err));
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendsId } }, { new: true })
            .then(user => { res.json(user) })
            .catch(err => res.json(err));
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendsId } }, { new: true })
            .then(user => {res.json(user)})
            .catch(err => res.json(err));
    }

};


module.exports = userController;