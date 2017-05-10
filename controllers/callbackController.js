module.exports = function (controller) {
    // receive an interactive message, and reply with a message that will replace the original
    controller.on('interactive_message_callback', function(bot, message) {

       console.log(JSON.stringify(message));

    });
};
