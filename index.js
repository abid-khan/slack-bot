var dotenv = require('dotenv');
dotenv.load();

var Botkit = require('botkit');
var mongoStorage = require('botkit-storage-mongo')({mongoUri: 'mongodb://127.0.0.1/slack'});

var controller = Botkit.slackbot({
    debug: false,
    interactive_replies:true,
    storage: mongoStorage
}).configureSlackApp({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    token:process.env.token,
    // Disable receiving messages via the RTM even if connected
    rtm_receive_messages: false,
    // Request bot scope to get all the bot events you have signed up for
    scopes: ['bot'],
});



var User = require('./models/user');
require('./controllers/index')(controller);

// if you are already using Express, you can use your own server instance...
// see "Use BotKit with an Express web server"
controller.setupWebserver(process.env.port,function(err,webserver) {
    controller.createWebhookEndpoints(controller.webserver, function() {
        console.log('This bot is online!!!');
    });

    controller.createOauthEndpoints(controller.webserver, function(err, req, res) {
        if (err) {
            res.status(500).send('ERROR: ' + err);
        } else {
            res.send('Success!');
        }
    });

    // If not also opening an RTM connection
    controller.startTicking();
});

