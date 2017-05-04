module.exports = function(controller, User) {
    controller.hears(['meeting'], 'direct_message,direct_mention', function(bot, message) {
        bot.startConversation(message, function(err, convo) {
            convo.say('Hey, there! ');

        });
    });
}
