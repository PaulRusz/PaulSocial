const { Schema, model } = require('mongoose')

// Schema used to create the Reaction model

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (createdAt) {
            return moment(createdAt).format('MMM DD, YYYY [at] hh:mm a')
        }
    }
},
// Indicates that the virtuals are to be included
{
    toJson: {
        virtuals: true,
    },
    id: false,
})


// Will not be a model but instead used as the reaction fields subdocument schema in the Thought model
model.exports = reactionSchema;