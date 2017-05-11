var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jiraUserSchema = new Schema({
    userId:String,
    requestToken:String,
    accessToken: String
}, { collection: 'jirauser' });

var JiraUser = mongoose.model('JiraUser', jiraUserSchema);

module.exports = JiraUser;