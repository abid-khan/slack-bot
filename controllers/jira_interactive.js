/**
 * Created by arvindkasale on 5/10/17.
 */
'use strict';

let jiraService = require('../services/jiraService');
let templateService = require('../services/templateService');
let constants = require('../config/constants_dev');
let templates = require('../templates/templates');
let open = require('open');
let rp = require('request-promise');


module.exports = function (controller) {
    // receive an interactive message, and reply with a message that will replace the original
    controller.on('interactive_message_callback', function(bot, message) {



        // check message.actions and message.callback_id to see what action to take...
        bot.startConversation(message, function (err, convo) {
            if(constants.convo.issueDetailButtonId === message.callback_id) {
                let jiraId = message.text;
                jiraService.getOpenIssueById(message.user, jiraId, convo);
            }
        });

        // check message.actions and message.callback_id to see what action to take...
        bot.startConversation(message, function (err, convo) {
            if(constants.convo.welcome.jiraLoginButtonId === message.callback_id) {
                console.log(message);
                rp.get(constants.oauthUrl + '?userId=' + message.user + '&teamId='+ message.team.id + '&channelId=' + message.channel).then(function(resp) {
                    let jsonResponse = JSON.parse(resp);
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
