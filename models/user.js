var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/slack');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    id:String,
    channel:String,
    team:String
});

var User = mongoose.model('User', userSchema);
module.exports = User;
