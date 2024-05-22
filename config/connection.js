const mongoose = require('mongoose')

mongoose.conect('mongodb://127.0.0.1:27017/PaulSocial')

module.exports = mongoose.connection;