module.exports = function (controller) {
    var open = require('open');

    // receive an interactive message, and reply with a message that will replace the original
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.callback_id == 'google_meeting') {
            //---Open hangout link
            open(message.actions[0].value);
        }

    });
};
