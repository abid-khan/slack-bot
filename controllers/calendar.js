module.exports = function (controller, restClient,wit) {

    var open = require('open');
    var opn = require('opn');
    var datetime = require('node-datetime');
    var Action = require('../vo/common/templateAction');
    var Field = require('../vo/common/templateField');
    var Meeting = require('../vo/common/templateBody');
    var Meetings = require('../vo/common/templateHead');


    //--Enable wit as middleware
    controller.middleware.receive.use(wit.receive);


    var buildAction = (name, text, value,style) => {
        var action = new Action(name, text, value,style);
        return action;
    };

    var buildField = (title, value, isShort) => {
        var field= new Field(title, value, isShort);
        return field;
    };

    var buildMeeting=(title,text,color,callbackId, fields,actions)=>{
        var meeting = new Meeting(title,text,color,callbackId,fields,actions);
        return meeting;
    };

    var buildMeetings=(text, attachments)=>{
        var meetings= new Meetings(text,attachments);
        return meetings;
    };

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

    var openLink=(url)=>{
        return new Promise(function(callback){
            open(url);
        });
    };

    /**
     *
     * @param userId
     * @returns {Promise}
     */
    var isAuthorized = (userId, channelId, teamId) => {
        return new Promise(function (authorizedCallback, unAuthorizeCallback) {
            restClient.get(process.env.restClientUrl + "/oauth/google", constructArgument(userId, channelId, teamId, 0),
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
    var findMeetings = (convo,userId,channelId,teamId, count) => {
        return new Promise(function (successCallback, errorCallback) {
            restClient.get(process.env.restClientUrl + "/google/calendar/meetings", constructArgument(userId, channelId, teamId, count),
                function (data, response) {
                    console.log("Meetings ..." + JSON.stringify(data));
                    successCallback(data);
                }).on("error", function (err) {
                console.log('something went wrong on the request', JSON.stringify(err));
                errorCallback(err);
            });
        });
    };


    var buildMeetingList=(data)=>{
        var meetings = new Array();
        for (var i = 0; i < data.items.length; i++) {
            //-------Add fields
            var fields=new Array();
            //--Add where
            var whereField = buildField('Where',data.items[i].location,true);
            fields.push(whereField);
            //--Add when
            var startTime = datetime.create(data.items[i].startTime);
            var fomrattedTime = startTime.format('m/d/Y H:M:S');
            var whenField = buildField('When',fomrattedTime,true);
            fields.push(whenField);

            //--------Add Actions
            var actions =  new Array();
            if(data.items[i].hangoutLink){
                var hangoutAction=buildAction("hangout","Join Meeting",data.items[i].hangoutLink, 'primary');
                actions.push(hangoutAction);
            }else{
                actions=null;
            }


            var meeting= buildMeeting(data.items[i].summary,data.items[i].description,data.items[i].color ? data.items[i].color:'#7CD197','google_meeting',fields,actions);
            meetings.push(meeting);
        }

        if(data.items.length > 0){
            var replyAsAttachment = buildMeetings("Your :knife_fork_plate: is full with :point_down: meetings",meetings);
        }else{
            var replyAsAttachment = buildMeetings("Noting on your :knife_fork_plate:",meetings);
        }

        return replyAsAttachment;
    };


    controller.hears(['meeting'], 'direct_message,direct_mention', function (bot, message) {
        bot.startConversation(message, function (err, convo) {
            convo.say('Hey, there!');

            isAuthorized(message.user,message.channel, message.team).then(function () {

                convo.ask({
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
                }, [
                    {
                        pattern: "5",
                        callback: function (reply, convo) {
                            console.log("user requested for upcoming " + 5 + " meetings");
                            convo.say('...');
                            findMeetings(convo,message.user,message.channel, message.team, 5).then(function(data){
                                bot.reply(message, buildMeetingList(data));
                            }, function (err) {
                                console.error("Failed due to ", err);
                            });
                            convo.next();

                        }
                    },
                    {
                        pattern: "10",
                        callback: function (reply, convo) {
                            console.log("user requested for upcoming " + 10 + " meetings");
                            convo.say('...');
                            findMeetings(convo,message.user,message.channel, message.team, 10).then(function(data){
                                bot.reply(message, buildMeetingList(data));
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
            }).catch(function (err) {
                console.error("Failed due to ", err);
                convo.next();
            });
        });
    });
};
