'use strict';
var openIssueTemplate = require('./open_issue_template');
var openIssueTemplateKey = require('./open_issues_template_key');
var dummySingleIssueTemplate = require('./dummy_single_issue_template');
var jiraUnauthorizedTemplate = require('./jira_unauthorized_template');

var templates = {
    openIssueTemplate: openIssueTemplate,
    openIssueTemplateKey: openIssueTemplateKey,
    dummySingleIssueTemplate: dummySingleIssueTemplate,
    jiraUnauthorizedTemplate: jiraUnauthorizedTemplate
};

module.exports = templates;
