'use strict';

var jiraService = require('../services/jiraService');
var templateService = require('../services/templateService');
var constants = require('../config/constants_dev');
var templates = require('../templates/templates');

var firstEntityValue = (entities, entity) => {
    const val = entities && entities[entity] &&
        Array.isArray(entities[entity]) &&
        entities[entity].length > 0 &&
        entities[entity][0].value;
    if (!val) {
        return null;
    }
    return typeof val === 'object' ? val.value : val;
};

module.exports = function (controller,wit) {

    //--Enable wit as middleware
    controller.middleware.receive.use(wit.receive);


    controller.hears(['task','ihavebeenmentioned','reportedbyme','iamassigned'], 'direct_message, direct_mention', wit.hears,function (bot, message) {
        bot.startConversation(message, function (err, convo) {

           if(firstEntityValue(message.entities,'ihavebeenmentioned')){
               //Fetch mentioned issues
           }else if(firstEntityValue(message.entities,'reportedbyme')){
               //Fetch reported by me

           }else if(firstEntityValue(message.entities,'iamassigned')){
               //TODO fetch my open

           }else{
               //Ask for  option show message with button
           }

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
