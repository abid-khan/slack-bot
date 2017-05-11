'use strict';

var constants = {};

constants.baseUrl = 'http://localhost:9090';
constants.apiUrl = constants.baseUrl + '/api';
constants.oauthUrl = constants.apiUrl + '/oauth/jira';
constants.allIssuesUrl = constants.apiUrl+'/jira/issues';
constants.convo = {
    openIssuesResponse : 'Here is the list of issues...',
    issueDetailButtonId : 'issueDetailButtonId',
    issueDetailButtonText: "Show Details",
    issue: {
        text: 'Here is data about your issue',
        errorText: ':x: Oops something failed. Here is the error.\n'
    },
    comment: {
      noCommentFound: 'Sorry!! No Comments on this issue yet...',
      commentsFound: ' comments found for the issue'
    },
    welcome: {
        text: ':smile: Welcome to AppBot ',
        description: 'AppBot takes the pain out of your day to day life. It makes your day to day tasks so much easier. ' +
        'AppBot handles all your Jira / Google Calendar quibles without you leaving your trusted messenger. Get started by doing any of the following...',
        unauthorizedWelcomeBody: 'Oh Oh! Can you please authorise me to access your Jira account. It will help me to assist you better! Thanks',
        google_description: 'Get a list of all your Gmail meetings. Also join meetings in a single click from Slack itself.',
        jira_description: 'Find all your issues from Jira. Check their status and comment on them too. Isn\'t it exciting.',
        google_example: '\nGo ahead type in "meeting" to see a list of your meetings.',
        jira_example: '\nGo ahead type in "my open issues" to see a list of your open issues.',
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