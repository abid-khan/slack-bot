'use strict';

var welcome = require('./welcome.js');
var calender = require('./calendar.js');
var calendarInteractive = require('./calendar_interactive');
var jira = require('./jira.js');
var jiraInteractive = require('./jira_interactive');
var home = require('./home');

module.exports = function(controller,restClient,wit) {
    //welcome(controller);
    calender(controller,restClient,wit);
    calendarInteractive(controller);
    jira(controller,wit);
    jiraInteractive(controller);
    home(controller);
};
