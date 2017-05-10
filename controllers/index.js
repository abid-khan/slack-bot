'use strict';

var welcome = require('./welcome.js');
var calender = require('./calendar.js');
var calendarInteractive = require('./calendar_interactive');
var jira = require('./jira.js');
var jiraInteractive = require('./jira_interactive');

module.exports = function(controller,restClient) {
    welcome(controller);
    calender(controller,restClient);
   // calendarInteractive(controller);
    jira(controller);
    jiraInteractive(controller);
};
