const { Schema, model } = require('mongoose')

// Schema used to create the User model
const userSchema = new Schema({
    username: {
        type: String,
        required: true, 
        unique: true,
        trim: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId, 
        ref: 'Thought'
    }],
    friends: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
},
// Indicates that the virtuals are to be included
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
)

// creates a virtual property that gets and sends the users friend count
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length
    })
const User = model('User', userSchema);

module.exports = User
