'use strict';

var constants = {};

constants.baseUrl = 'http://localhost:9090';
constants.apiUrl = constants.baseUrl + '/api';
constants.oauthUrl = constants.apiUrl + '/oauth/jira?userId=';
constants.openIssuesUrl = constants.apiUrl+'/jira/issues/myopen';
constants.convo = {
    openIssuesResponse : 'Here is a list of issues...',
    issueDetailButtonId : 'issueDetailButtonId',
    issueDetailButtonText: "Show Details",
    welcome: {
        text: 'Welcome to AppBot ',
        description: 'AppBot takes the pain out of your day to day life. It makes your day to day tasks so much easier. ' +
        'AppBot handles all your Jira / Google Calendar quibles without you leaving your trusted messenger. Get started by doing any of the following...',
        unauthorizedWelcomeBody: 'Oh Oh! Can you please authorise me to access your Jira account. It will help me to assist you better! Thanks',
        google_description: 'Get a list of all your Gmail meetings. Also join meetings in a single click from Slack itself.',
        jira_description: 'Find all your issues from Jira. Check their status and comment on them too. Isn\'t it exciting.',
        google_example: '\nGo ahead type in "meetings" to see a list of your meetings.',
        jira_example: '\nGo ahead type in "open issues" to see a list of your open issues.',
        google: 'Google Connector',
        jira: 'Jira Connector',
        authButton: 'Allow AppBot',
        jiraLoginButtonId : 'jiraLoginButtonId',
        jiraLoginButtonColor: '#ff0000',
    },
}
constants.priority = {
    "Highest" : "#FF0000",
    "High" : "#FF9900",
    "Medium" : "#FFFF00",
    "Low" : "#7FFF00",
    "Lowest" : "#084381",
    null : '#FFFF00'
}

module.exports = constants;