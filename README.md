# slack-bot

## Objective ##
* Objective of this bot to to do away with syntax or command or mouse clicks  from day to day work

## Introduction ##
This project focus to build a natual language processing slack bot that fetces user's  meeting details from google calendar and tasks from jira. Right now it is initial verson and  performs limited functionalities.  Felow functionalities are supported as of now.

* Google Calendar 
  * Get meeting details 
* Jira
  * Get issues
    * Get open issues assigned to user 
    * Get issues created by user
    * Get isseus in which user is mentioned in last one day


To access  google calendar or jira user has to authorize the bot. Once authorized , user can interact with bot like interacting with human being. 

## Prerequisites ##
To understand this bot and related APIs one should have knowledge on 
* [NodeJS]()
* [MongoDB]()
* [wit.ai]()
* [Springboot]()
* [Botkit]()

## Configuration ##
This bot has below listed configuration. One need to update it in .env file to get it worked.
```
#Slack App client ID
clientId=4995230642.174778841991
#Slack App client secret
clientSecret=7d416c018fdeae6e06ed89597d664036
#Slack App token
token=sDFM0wZtRyRSqk9QC8Gj0ffr
#Bot server port
port=3000
#REST API end point
restClientUrl=http://localhost:9090/api
#Wit server access token
wit_server_access_token=VDCBVLO5PGD3GCJXJVRS6LN65VMPM755
```

Before you start, first  one has to create a bot in slack.  To create one for you  go to [slack API](https://api.slack.com/) page and create your app. You have to update below  pages.

### Bot Users ###
Update bot name. Use some cool name

### Event sbscriptions ###
Update request URL.If your  server is running on https://d1de3ca1.ngrok.io then the url should be https://d1de3ca1.ngrok.io/slack/receive. While working on local machine you need to create an link to be used.  For this you can use [ngrock](https://ngrok.com/)

### OAuth & Permissions ###
Update redirect url. If your  server is running on https://d1de3ca1.ngrok.io then the url should be https://d1de3ca1.ngrok.io/oauth 

### Interactive Message ###
Update Request URL. If your  server is running on > https://d1de3ca1.ngrok.io then the url should be https://d1de3ca1.ngrok.io/slack/receive


**Copy client id, secret and token from Basic Information page. Update display name , icon etc as per your preference.**

### restClientUrl ###
It is the URL of the application running to  communicate with gmail and jira. This code is available here [helpbot-rest](https://github.com/abid-khan/helpbot-rest).

## How to run ##
To run this, go to terminal and execute below commands.
```
npm install
npm start 
```

## Screencast ##
### Google Calendar ###
You can access screencast [here](http://www.screencast.com/t/xtMxwIverg);
### Jira ###
You can access screencast [here](https://www.screencast.com/t/2VQMXGbGD);




