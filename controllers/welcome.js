module.exports = function(controller, User) {
    controller.hears(['color'], 'direct_message,direct_mention', function(bot, message) {
        console.log('user detail ==> ' + JSON.stringify(message));


        /*User.find({id:message.user},function(err,user){
            if(err) throw  err;

            if(!user){
                 user  =  new User({
                    id: message.user,
                    channel:message.channel,
                    team:message.team
                });
                user.save(function(err){
                    if (err) throw err;
                    console.log(JSON.stringify(user) + "saved successfully");
                });
            }else{
                console.log('user present');
            }
        });*/


        bot.startConversation(message, function(err, convo) {
            convo.say('Hey, there! ');

            convo.ask({
                attachments:[
                    {
                        title: 'Do you want to proceed?',
                        callback_id: '123',
                        attachment_type: 'default',
                        actions: [
                            {
                                "name":"yes",
                                "text": "Yes",
                                "value": "yes",
                                "type": "button",
                            },
                            {
                                "name":"no",
                                "text": "No",
                                "value": "no",
                                "type": "button",
                            }
                        ]
                    }
                ]
            },[
                {
                    pattern: "yes",
                    callback: function(reply, convo) {
                        console.log("ffff");
                        convo.say('FABULOUS!');
                        convo.next();
                        // do something awesome here.
                    }
                },
                {
                    pattern: "no",
                    callback: function(reply, convo) {
                        console.log("yyy");
                        convo.say('Too bad');
                        convo.next();
                    }
                },
                {
                    default: true,
                    callback: function(reply, convo) {
                        // do nothing
                    }
                }
            ]);
        });
    });
}
