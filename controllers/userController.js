const { TextEncoderStream } = require('node:stream/web');
const { User, Application } = require('../model')

module.exports = {

    //  Get all the users
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //  Gets a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-_v')

            if (!user) {
                return res.status(404).json({ message: 'There is no user with that ID!'})
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Creates a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body)
            res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Updates a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true } )

            if(!user) {
                return res.status(404).json({ message: 'There is no user with that ID!' })
            }

            await Application.updateMany({ _id: { $in: user.applicatons } })
            res.json({ message: 'This user has been updated!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Deletes a user & the associated apps
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId })
        
            if(!user) {
                return res.status(404).json({ message: 'There is no user with that ID!' })
            }

            await Application.deleteMany({ _id: { $in: user.applications } })
            res.json({ message: 'This user and their apps have been deleted!'})
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Adds a Friend
    async addFriend(req, res) {
        try {
            const user = await User.findByID(req.params.Id)
            const newFriend = await User.findById(req.params.friendId)

            if (!user || !newFriend ) {
                return res.status(404).json({ message: 'User or Friend not found!' })
            }

            // Check to see if friend is already in user's friend list
            if (user.friends.includes(newFriend._id)) {
                return res.status(400).json({ message: 'This friend has already been added!' })
            }

            user.friends.push(newFriend._id)
            await user.save()

            res.json(user)
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Server error' })
        }
    },


    // Deletes a Friend
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, {$pull: { friends: req.params.friendId } }, { new: true })

            if (!user) {
                return res.status(404).json({ message: 'Friend not found!' })
            }

            res.json(user)
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

}; 

module.exports = userController;