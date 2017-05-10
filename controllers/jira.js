'use strict';

var jiraService = require('../services/jiraService');
var templateService = require('../services/templateService');
var constants = require('../config/constants_dev');
var templates = require('../templates/templates');

module.exports = function (controller) {
    controller.hears(['open issues'], 'direct_message, direct_mention', function (bot, message) {
        bot.startConversation(message, function (err, convo) {
            jiraService.openIssues('123')
                .then(function (response, body) {
                    var response = JSON.parse(response);
                    var issues = response.issues;
                    convo.say(constants.convo.openIssuesResponse);
                    issues.forEach(function(issue) {
                        issue = templateService.addMetaData(issue, {color : constants.priority[issue.priority.name]});
                        var enhancedData = templateService.enhance(templates.openIssueTemplate, templates.openIssueTemplateKey, issue);
                        convo.say(enhancedData);
                    });
                })
                .catch(function(err) {
                    convo.say("Something went wrong!!" + err);
                })
        });
    });
};