'use strict';

let jiraService = require('../services/jiraService');
let constants = require('../config/constants_dev');
let templates = require('../vo/common/templates');
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

module.exports = function (controller,wit) {

    //--Enable wit as middleware
    controller.middleware.receive.use(wit.receive);


    controller.hears(['task','ihavebeenmentioned','reportedbyme','iamassigned'], 'direct_message, direct_mention', wit.hears,function (bot, message) {
        bot.startConversation(message, function (err, convo) {

            userService.findById(message.user).then(function(user) {
                if(user) {
                    console.log("Slack user found "+ user.user);
                    jiraUserService.findById(user.id).then(function (jiraUser) {
                        if(jiraUser) {
                            console.log("Jira User found " + jiraUser.userId);
                            console.log(message.entities);
                            if(firstEntityValue(message.entities,'ihavebeenmentioned')){
                                //Fetch mentioned issues
                            }else if(firstEntityValue(message.entities,'reportedbyme')){
                                //Fetch reported by me

                            }else if(firstEntityValue(message.entities,'iamassigned')){
                                jiraService.openIssues(message.user)
                                    .then(function (response, body) {
                                        console.log("Issue from Jira" + response);
                                        let issues = JSON.parse(response).issues;
                                        convo.say(buildIssueListResponse(issues, convo));
                                    })
                                    .catch(function (err) {
                                        convo.say("Something went wrong!!" + err);
                                    });
                            }else{

                            }
                        } else {
                            welcomeService.welcomeUser(user, jiraUser, convo);
                        }
                    });
                }
            });
        });
    });

    let buildIssueListResponse = (issues, convo) => {
        let issueHeader = new templates.templateHead(constants.convo.openIssuesResponse, []);
        for(let index in issues) {
            let issue = issues[index];
            let issueBody = new templates.templateBody(issue.key, issue.summary, constants.priority[issue.priority], constants.convo.issueDetailButtonId , [], []);
            let issueField1 = new templates.templateField("Reporter", issue.reporter.name);
            let issueField2 = new templates.templateField("Priority", issue.priority);
            issueBody.fields.push(issueField1, issueField2);
            let issueDetailAction = new templates.templateAction("issue_detail", constants.convo.issueDetailButtonText, "issue_detail", "primary");
            issueBody.actions.push(issueDetailAction);
            issueHeader.attachments.push(issueBody);
        }
        return issueHeader;
    }
};
