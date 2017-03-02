const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const collection = 'accounts'

const Account = new mongoose.Schema({});

Account.plugin( passportLocalMongoose );

module.exports = mongoose.model('Account', Account);