module.exports = function(controller, User) {
    controller.hears(['hello'], 'direct_message,direct_mention', function(bot, message) {

        var reply_with_attachments = {
            'username': 'My bot' ,
            'text': 'This is a pre-text',
            'attachments': [
                {
                    'fallback': 'To be useful, I need you to invite me in a channel.',
                    'title': 'How can I help you?',
                    'text': 'To be useful, I need you to invite me in a channel ',
                    'color': '#7CD197',
                    'actions': [
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
                },
                {
                    'fallback': 'To be useful, I need you to invite me in a channel.',
                    'title': 'How can I help you?',
                    'text': 'To be useful, I need you to invite me in a channel ',
                    'color': '#7CD197'
                }
            ],
            'icon_url': 'http://lorempixel.com/48/48'
        }

        bot.reply(message, reply_with_attachments);

    });

    controller.hears(['color'], 'direct_message,direct_mention', function(bot, message) {
        console.log('user detail ==> ' + JSON.stringify(message));

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
