/**
 * Created by smedapati on 2/15/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  username: String,
  password: String,
  accessToken:String,
  preferences:Array

});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
