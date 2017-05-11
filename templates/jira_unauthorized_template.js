/**
 * Created by arvindkasale on 5/10/17.
 */
'use strict';

var constants = require('../config/constants_dev');

var jiraUnauthorizedTemplate = {
    "text": "It seems that you have not been authenticated with Jira yet!!!",
    "attachments": [
        {
            "title": "",
            "callback_id": constants.convo.jiraLoginButtonId,
            "actions": [
                {
                    "name":"Login",
                    "text": "Login to Jira",
                    "value": "login_jira",
                    "type": "button",
                }
            ]
        }
    ]
};

module.exports = jiraUnauthorizedTemplate;