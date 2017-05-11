module.exports = function (controller, restClient,wit,winston) {

    var open = require('open');
    var opn = require('opn');
    var datetime = require('node-datetime');
    var Action = require('../vo/common/templateAction');
    var Field = require('../vo/common/templateField');
    var Meeting = require('../vo/common/templateBody');
    var Meetings = require('../vo/common/templateHead');


    //--Enable wit as middleware
    controller.middleware.receive.use(wit.receive);


    /**
     *
     * @param userId
     * @param maxCount
     * @returns {{parameters: {userId: *, maxCount: *}}}
     */
    var constructArgument = (userId, channelId, teamId, maxCount) => {
        var args = {
            parameters: {userId: userId,channelId:channelId, teamId:teamId,maxCount: maxCount},
        };
        return args;
    };


    /**
     *
     * @param userId
     * @returns {Promise}
     */
    var isAuthorized = (userId, channelId, teamId) => {
        return new Promise(function (callback) {
            restClient.get(process.env.restClientUrl + "/oauth/google", constructArgument(userId, channelId, teamId, 0),
                function (data, response) {
                    winston.log("Is authorized for userId " + userId + " .. " + JSON.stringify(data));
                    callback(data);
                }).on("error", function (err) {
                winston.log('something went wrong on the request', JSON.stringify(err));
                throw err;
            });
        });
    };




    controller.hears(['meeting'], 'direct_message,direct_mention',wit.hears, function (bot, message) {
        winston.log("here.......");

        bot.startConversation(message, function (err, convo) {
            convo.say('Hey, there!');
            isAuthorized(message.user,message.channel, message.team).then(function(data){
                if (data.url) {
                    winston.log(data.url);
                    convo.say({
                        text: 'Oops! :flushed: you have not authorized me to access your calendar.To help you ,please authorize me :point_down:',
                        attachments: [
                            {
                                title: 'Authorize me',
                                attachment_type: 'default',
                                callback_id: 'google_oauth',
                                actions: [
                                    {
                                        name: "Authorize",
                                        text: "Authorize",
                                        value: "authorize",
                                        type: "button",
                                        style: "primary",
                                    }
                                ]
                            }
                        ]
                    }, [
                        {
                            pattern: "authorize",
                            callback: function (reply, convo) {
                                convo.say("You are being redirect...");
                                open(url);
                            }
                        },
                        {
                            default: true,
                            callback: function (reply, convo) {
                                // do nothing
                            }
                        }
                    ]);
                }else{
                    convo.say({
                        attachments: [
                            {
                                title: ':+1: choose max number of meeting you wish to have on your :knife_fork_plate:',
                                callback_id: 'meeting_count',
                                attachment_type: 'default',
                                actions: [
                                    {
                                        "name": "5",
                                        "text": "5",
                                        "value": "5",
                                        "type": "button",
                                    },
                                    {
                                        "name": "10",
                                        "text": "10",
                                        "value": "10",
                                        "type": "button",
                                    }
                                ]
                            }
                        ]
                    });
                }
            }).catch(function(err){
                winston.log(err);
            });
        });
    });
};
