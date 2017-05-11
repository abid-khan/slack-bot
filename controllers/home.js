/**
 * Created by arvindkasale on 5/10/17.
 */
'use strict';

var userService = require('../services/userService');
var jiraUserService = require('../services/jiraUserService');
var templateService = require('../services/templateService');
var constants = require('../config/constants_dev');
var templates = require('../templates/templates');
var welcomeService = require('../services/welcomeService');

module.exports = function(controller) {
    controller.on('bot_channel_join', function(bot, message) {
        console.log('bot channel joined');
        console.log(message);
    });

    controller.on('user_channel_join', function(bot, message) {
        console.log('user channel joined');
        console.log(message);
    });

    controller.hears(['Redirecting to'], 'direct_message,direct_mention', function(bot, message) {
        bot.startConversation(message, function(err, convo) {
           convo.next()
        });
    });

    controller.hears([''], 'direct_message,direct_mention', function(bot, message) {
        bot.startConversation(message, function(err, convo) {
            if(message) {
                userService.findById(message.user).then(function(user) {
                    if(user) {
                        jiraUserService.findById(user.id).then(function(jiraUser) {
                           welcomeService.welcomeUser(user, jiraUser, convo);
                        });
                    }
                });
            }
        });
    });
};