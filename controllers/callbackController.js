/**
 * Created by abidkhan on 09/05/17.
 */
module.exports = function(controller) {

    controller.on('interactive_message_callback', function(bot, message) {
        console.log('Received callback id ' +  JSON.stringfy(message));

    });
}
