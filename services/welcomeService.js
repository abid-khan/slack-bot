'use strict';

let templates = require('../vo/common/templates');
let welcomeConstant = require('../config/constants_dev').convo.welcome;

let welcomeService = {};

welcomeService.welcomeUser = function (user, jiraUser, convo) {
    if(jiraUser) {
        let response = buildPositiveResponse(user, jiraUser);
        convo.say(response);
    } else {
        let response = buildNegativeResponse();
        convo.say(response);
    }
};

let buildPositiveResponse = (user) => {
  let welcomeHead = new templates.templateHead(welcomeConstant.text + user.user, []);
  let welcomeBody = new templates.templateBody("", welcomeConstant.description);
  let googleBody = new templates.templateBody(welcomeConstant.google, (welcomeConstant.google_description + welcomeConstant.google_example));
  let jiraBody = new templates.templateBody(welcomeConstant.jira, (welcomeConstant.jira_description + welcomeConstant.jira_example));
  welcomeHead.attachments.push(welcomeBody, googleBody, jiraBody);
  return welcomeHead;
};

let buildNegativeResponse = () => {
  let welcomeHead = new templates.templateHead(welcomeConstant.text, []);
  let welcomeBody = new templates.templateBody("", welcomeConstant.description);
  let unauthorizedWelcomeBody = new templates.templateBody("", welcomeConstant.unauthorizedWelcomeBody, welcomeConstant.jiraLoginButtonColor, welcomeConstant.jiraLoginButtonId, [], []);
  let authAction = new templates.templateAction("auth", welcomeConstant.authButton, "auth", "primary")
  unauthorizedWelcomeBody.actions.push(authAction);
  welcomeHead.attachments.push(welcomeBody, unauthorizedWelcomeBody);
  return welcomeHead;
}

module.exports = welcomeService;