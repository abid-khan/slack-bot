module.exports = function (controller, restClient) {

    var open = require('open');
    var datetime = require('node-datetime');

    /**
     *
     * @param userId
     * @param maxCount
     * @returns {{parameters: {userId: *, maxCount: *}}}
     */
    var constructArgument = (userId, maxCount) => {
        var args = {
            parameters: {userId: userId, maxCount: maxCount},
        };
        return args;
    };


    /**
     *
     * @param userId
     * @returns {Promise}
     */
    var isAuthorized = (userId) => {
        return new Promise(function (authorizedCallback, unAuthorizeCallback) {
            restClient.get(process.env.restClientUrl + "/oauth/google", constructArgument(userId, 0),
                function (data, response) {
                    console.log("Is authorized for userId " + userId + " .. " + JSON.stringify(data));
                    if (data.url) {
                        unAuthorizeCallback(data.url);
                    } else {
                        authorizedCallback();
                    }
                }).on("error", function (err) {
                console.log('something went wrong on the request', JSON.stringify(err));
                throw err;
            });
        });
    };

    /**
     *
     * @param userId
     * @param count
     * @returns {Promise}
     */
    var findMeetings = (userId, count) => {
        return new Promise(function (successCallback, errorCallback) {
            restClient.get(process.env.restClientUrl + "/google/calendar/meetings", constructArgument(userId, count),
                function (data, response) {
                    console.log("Meetings ..." + JSON.stringify(data));
                    successCallback(data);
                }).on("error", function (err) {
                console.log('something went wrong on the request', JSON.stringify(err));
                errorCallback(err);
            });
        });
    };


    controller.hears(['meeting'], 'direct_message,direct_mention', function (bot, message) {
        bot.startConversation(message, function (err, convo) {
            convo.say('Hey, there!');

            isAuthorized(message.user).then(function () {
                //handle authorized flow
                //TODO
                convo.ask({
                    attachments: [
                        {
                            title: 'How many meetings you want to know?',
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
                }, [
                    {
                        pattern: "5",
                        callback: function (reply, convo) {
                            console.log("user requested for upcoming " + 5 + " meetings");
                            findMeetings(message.user, 5).then(function (data) {
                                console.log(JSON.stringify(data));
                                var meetings = new Object();
                                meetings.text='Your upcoming meetings...';
                                meetings.attachments= new Array();
                                for (var i = 0; i < data.items.length; i++) {
                                    var meeting = new Object();
                                    meeting.title= data.items[i].summary;
                                    var fields =  new Array();

                                    var startTimeField  = new Object();
                                    startTimeField.title='When';
                                    var startTime= datetime.create(data.items[i].startTime);
                                    var fomrattedTime = startTime.format('m/d/Y H:M:S');
                                    startTimeField.value= fomrattedTime;
                                    startTimeField.short=false;
                                    fields.push(startTimeField);

                                    var whereField  = new Object();
                                    whereField.title='Where';
                                    whereField.value= data.items[i].location;
                                    whereField.short=false;
                                    fields.push(whereField);


                                    var descField  = new Object();
                                    descField.title='Description';
                                    descField.value= data.items[i].description;
                                    descField.short=false;
                                    fields.push(descField);

                                    var hangoutField  = new Object();
                                    hangoutField.title='Link';
                                    hangoutField.value= data.items[i].hangoutLink;
                                    hangoutField.short=false;
                                    fields.push(hangoutField);


                                    meeting.fields=fields;
                                    meeting.color= '#7CD197';
                                    meetings.attachments[i]=meeting;
                                }
                                bot.reply(message, meetings);
                            }, function (err) {
                                console.error("Failed due to ", err);

                            });
                            convo.next();
                            // do something awesome here.
                        }
                    },
                    {
                        pattern: "10",
                        callback: function (reply, convo) {
                            console.log("user requested for upcoming " + 10 + " meetings");
                            findMeetings(message.user, 5).then(function (data) {
                                console.log(JSON.stringify(data));
                            }, function (err) {
                                console.error("Failed due to ", err);

                            });
                            convo.next();
                        }
                    },
                    {
                        default: true,
                        callback: function (reply, convo) {
                            // do nothing
                        }
                    }
                ]);

            }, function (url) {
                //handle unauthorized flow

                console.log('Not authorized..', url);
                convo.ask({
                        text: 'Oops! you have not authorized me to access your calendar.',
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
                    });
            }).catch(function (err) {
                console.error("Failed due to ", err);
            });

        });
    });
};