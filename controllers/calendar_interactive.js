module.exports = function (controller) {
    var open = require('open');

    // receive an interactive message, and reply with a message that will replace the original
    controller.on('interactive_message_callback', function (bot, message) {
        console.log("innn ::" +JSON.stringify(message))
        bot.startConversation(message, function (err, convo) {
            if (message.callback_id == 'google_meeting') {
                //---Open hangout link
                convo.say("You are being redirected....")
                open(message.actions[0].value);
            }
            convo.next();

        });

    });
};
