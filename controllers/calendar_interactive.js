module.exports = function (controller,restClient,logger) {
    var open = require('open');
    var base64 = require('base-64');
    var datetime = require('node-datetime');
    var Action = require('../vo/common/templateAction');
    var Field = require('../vo/common/templateField');
    var Meeting = require('../vo/common/templateBody');
    var Meetings = require('../vo/common/templateHead');


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


    /**
     *
     * @param userId
     * @param count
     * @returns {Promise}
     */
    var findMeetings = (userId,channelId,teamId, count) => {

        return new Promise(function (callback) {
            restClient.get(process.env.restClientUrl + "/google/calendar/meetings", constructArgument(userId, channelId, teamId, count),
                function (data, response) {
                    callback(data);
                }).on("error", function (err) {
                logger.log('something went wrong on the request', err);
                throw err;
            });
        });
    };


    var buildMeetingList=(data)=>{
        var meetings = new Array();
        var replyAsAttachment = buildMeetings("Noting on your :knife_fork_plate:",meetings);
        if(data.items && data.items.length > 0){
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
                    var hangoutAction=buildAction("hangout","Join Meeting",base64.encode(data.items[i].hangoutLink), 'primary');
                    actions.push(hangoutAction);
                }else{
                    actions=null;
                }


                var meeting= buildMeeting(data.items[i].summary,data.items[i].description,data.items[i].color ? data.items[i].color:'#7CD197','google_meeting',fields,actions);
                meetings.push(meeting);
            }
             replyAsAttachment = buildMeetings("Your :knife_fork_plate: is full with :point_down: meetings",meetings);

        }
        return replyAsAttachment;
    };



    // receive an interactive message, and reply with a message that will replace the original
    controller.on('interactive_message_callback', function (bot, message) {


            if (message.callback_id == 'google_meeting') {
                bot.startConversation(message, function (err, convo) {
                    //---Open hangout link
                    convo.say("You are being redirected....")
                    open(base64.decode(message.actions[0].value));
                    convo.end();
                });
            }

            if (message.callback_id == 'google_oauth') {
                bot.startConversation(message, function (err, convo) {
                    //---Open hangout link
                    convo.say("You are being redirected....")
                    logger.log("url.." + base64.decode(message.actions[0].value));
                    open(base64.decode(message.actions[0].value));
                    convo.end();
                });

            }

            if (message.callback_id == 'meeting_count') {
                bot.startConversation(message, function (err, convo) {
                    logger.log("Fetching meetings...");
                    findMeetings(message.user, message.channel, message.team.id, message.actions[0].value).then(function (data) {
                            convo.say(buildMeetingList(data));
                            convo.end();
                        }
                    ).catch(function (err) {
                        logger.log(err);
                    });
                });

            }
            //convo.end();

    });
};
