'use strict';

let jiraService = require('../services/jiraService');
let userService = require('../services/userService');
let jiraUserService = require('../services/jiraUserService');
let welcomeService = require('../services/welcomeService');



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

module.exports = function (controller,wit,winston) {

    //--Enable wit as middleware
    controller.middleware.receive.use(wit.receive);


    controller.hears(['task','ihavebeenmentioned','reportedbyme','iamassigned'], 'direct_message, direct_mention', wit.hears, function (bot, message) {
        bot.startConversation(message, function (err, convo) {

            userService.findById(message.user).then(function(user) {
                if(user) {
                    winston.log("Slack user found "+ user.user);
                    jiraUserService.findById(user.id).then(function (jiraUser) {
                        if(jiraUser) {
                            winston.log("Jira User found " + jiraUser.userId);
                            if(firstEntityValue(message.entities,'ihavebeenmentioned')){
                                jiraService.getAllOpenIssues(message.user, 'ihavebeenmentioned', convo);
                            }else if(firstEntityValue(message.entities,'reportedbyme')){
                                jiraService.getAllOpenIssues(message.user, 'reportedbyme', convo);
                            }else if(firstEntityValue(message.entities,'iamassigned')){
                                jiraService.getAllOpenIssues(message.user, 'iamassigned', convo);
                            }else{
                                jiraService.askMoreQuestions(message.user, convo);
                            }
                        } else {
                            welcomeService.welcomeUser(user, jiraUser, convo);
                        }
                    });
                }
            });
        });
    });

    controller.hears(['issues'], 'direct_message, direct_mention', function (bot, message) {
       bot.startConversation(message, function(err, convo) {
           userService.findById(message.user).then(function(user) {
               if(user) {
                   winston.log("Slack user found "+ user.user);
                   jiraUserService.findById(user.id).then(function (jiraUser) {
                       if(jiraUser) {
                           winston.log("Jira User found " + jiraUser.userId);
                           jiraService.askMoreQuestions(message.user, convo);
                       }
                       else {
                               welcomeService.welcomeUser(user, jiraUser, convo);
                           }
                       });
               }
           });
       })
    });

    controller.hears(['taskdetail'], 'direct_message, direct_mention', function(bot, message) {
        bot.startConversation(message, function(err, convo) {
            let issueId = firstEntityValue(message.entities,'taskid').trim();
            if(issueId) {
                jiraService.getOpenIssueById(message.user, issueId, convo);
            }
            else {
                welcomeService.welcomeUser(user, jiraUser, convo);
            }
        });
    });


    controller.hears(['taskcomment'], 'direct_message, direct_mention', function(bot, message) {
        bot.startConversation(message, function(err, convo) {
            let issueId = firstEntityValue(message.entities,'taskid').trim();
            if(issueId) {
                jiraService.getCommentsForIssue(message.user, issueId, convo);
            }
            else {
                welcomeService.welcomeUser(user, jiraUser, convo);
            }
        });
    });

};
