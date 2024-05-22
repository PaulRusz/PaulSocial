const { Schema, model } = require('mongoose')

// Schema used to create the Thought model

const thoughtSchema = new Schema({
    thoughtText: {
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // getter method to format the timestamp on a query & formats same
        get: function (createdAt) {
            return dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        reactionSchema
    ]
},
// Indicates that the virtuals are to be included
{
    toJSON: {
        virtuals: true,
    },
    id: false,
})

// Creates a virtual property that gets the length of the thought reactions 
thoughtSchema
.virtual('reactionCount')
.get(function () {
    return this.reactions.length
})
const Thought = model('Thought', thoughtSchema)

module.exports = Thought