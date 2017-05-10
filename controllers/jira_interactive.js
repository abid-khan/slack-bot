/**
 * Created by arvindkasale on 5/10/17.
 */
'use strict';

var jiraService = require('../services/jiraService');
var templateService = require('../services/templateService');
var constants = require('../config/constants_dev');
var templates = require('../templates/templates');


module.exports = function (controller) {
    // receive an interactive message, and reply with a message that will replace the original
    controller.on('interactive_message_callback', function(bot, message) {

        // check message.actions and message.callback_id to see what action to take...
        bot.startConversation(message, function (err, convo) {
            if(constants.convo.issueDetailButtonId === message.callback_id) {
                convo.say(templates.dummySingleIssueTemplate);
            }
        });

    });
};