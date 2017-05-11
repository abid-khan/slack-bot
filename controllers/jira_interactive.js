/**
 * Created by arvindkasale on 5/10/17.
 */
'use strict';

var jiraService = require('../services/jiraService');
var templateService = require('../services/templateService');
var constants = require('../config/constants_dev');
var templates = require('../templates/templates');
var open = require('open');
var rp = require('request-promise');


module.exports = function (controller) {
    // receive an interactive message, and reply with a message that will replace the original
    controller.on('interactive_message_callback', function(bot, message) {



        // check message.actions and message.callback_id to see what action to take...
        bot.startConversation(message, function (err, convo) {
            if(constants.convo.issueDetailButtonId === message.callback_id) {
                convo.say(templates.dummySingleIssueTemplate);
            }
        });

        // check message.actions and message.callback_id to see what action to take...
        bot.startConversation(message, function (err, convo) {
            if(constants.convo.welcome.jiraLoginButtonId === message.callback_id) {
                rp.get(constants.oauthUrl + message.user).then(function(resp) {
                    var jsonResponse = JSON.parse(resp);
                    console.log("response"+ jsonResponse);
                    open(jsonResponse.url);
                    convo.next();
                }).catch(function(err) {
                    console.log("Err"+err);
                });
            }
        });

    });
};
