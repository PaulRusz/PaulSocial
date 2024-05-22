const { Thought, Applicaton } = require('../model')

module.exports = {

    // Get all the Thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-_v')

            if (!thought) {
                return res.status(404).json({ message: 'There is no Thought with that ID!' })
            }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Creates a new Thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body)
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Updates a Thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true } )
        

        if(!thought) {
            return res.status(404).json({ message: 'There is no Thought with that ID!' })
        }

        await Applicaiton.updateMany({ _id: { $in: thought.applications } })
        res.json({ message: 'This Thought has been updated!' })
        } catch (err) {
        res.status(500).json(err)
        }
    },


    // Deletes a Thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtID })

            if(!thought) {
                return res.status(404).json({ message: 'There is no Thought with that ID!' })
            }

            await application.deleteMany({ _id: { $in: thought.applications } })
            res.json({ message: 'This Thought and the related apps have been deleted!' })
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Adds a reaction
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: {reactions: req.body} }, { runValidators: true, new: true } )

            if (!thought) {
                return res.status(404).json({ message: 'There is no Thought with this ID!' })
            }

            res.json(thought)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },


    // Deletes a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true } )

            if (!thought) {
                return res.status(404).json({ message: 'There is no Thought with this ID!' })
            }

            res.json(thought)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = thoughtController;