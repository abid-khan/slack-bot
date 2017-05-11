var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: String,
    user: String,
    team_id: String,
    access_token: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
