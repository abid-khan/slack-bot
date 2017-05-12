module.exports = function (controller, restClient,wit,logger) {

    var open = require('open');
    var base64 = require('base-64');


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
                    logger.info("Is authorized for userId " + userId + " .. " + data);
                    callback(data);
                }).on("error", function (err) {
                logger.info('something went wrong on the request'+ err);
                throw err;
            });
        });
    };


    controller.hears(['meeting'], 'direct_message,direct_mention',wit.hears, function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            convo.say('Hey, there!');
            isAuthorized(message.user,message.channel, message.team).then(function(data){
                if (data.url) {
                    logger.info(data.url);
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
                                        value: base64.encode(data.url),
                                        type: "button",
                                        style: "primary",
                                    }
                                ]
                            }
                        ]
                    });
                }else{
                    bot.reply(message,{
                        attachments: [
                            {
                                title: 'Number',
                                callback_id: 'meeting_count',
                                attachment_type: 'default',
                                actions: [
                                    {
                                        "name": "5",
                                        "text": "5",
                                        "value": "5",
                                        "type": "button",
                                        style: "primary",

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
                logger.error(err);
            });
        });
    });
};
