'use strict';

var calender = require('./calendar.js');
var calendarInteractive = require('./calendar_interactive');
var jira = require('./jira.js');
var jiraInteractive = require('./jira_interactive');
var home = require('./home');

module.exports = function(controller,restClient,wit,winston) {
    calender(controller,restClient,wit,winston);
    calendarInteractive(controller,restClient,winston);
    jira(controller,wit,winston);
    jiraInteractive(controller,winston);
    home(controller,winston);
};
