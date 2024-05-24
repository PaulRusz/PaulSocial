const router = require('express').Router();

const User = require('./User')
const Thought = require('./Thought')

router.use('/users', User)
router.use('/thougths', Thought)

module.exports = { User, Thought }