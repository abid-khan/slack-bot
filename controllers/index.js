'use strict';

var welcome = require('./welcome.js');
var calender = require('./calendar.js');
var jira = require('./jira.js');
var jiraInteractive = require('./jira_interactive');

module.exports = function(controller) {
    welcome(controller);
    calender(controller);
    jira(controller);
    jiraInteractive(controller);
};