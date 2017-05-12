'use strict';

var calender = require('./calendar.js');
var calendarInteractive = require('./calendar_interactive');
var jira = require('./jira.js');
var jiraInteractive = require('./jira_interactive');
var home = require('./home');

module.exports = function(controller,restClient,wit,logger) {
    calender(controller,restClient,wit,logger);
    calendarInteractive(controller,restClient,logger);
    jira(controller,wit,logger);
    jiraInteractive(controller,logger);
    home(controller,logger);
};
