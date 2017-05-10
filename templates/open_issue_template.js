'use strict';

var constants = require('../config/constants_dev');

var openIssueTemplate = {
    "text": "Issue - :key",
    "attachments": [
        {
            "title": ":key",
            "text": ":summary",
            "color": ":color",
            "fields": [
                {
                    "title": "Reporter",
                    "value": ":reporter",
                    "short": true
                },
                {
                    "title": "Priority",
                    "value": ":priority",
                    "short": true
                },
            ],
            "callback_id": constants.convo.issueDetailButtonId,
            "actions": [
                {
                    "name":"yes",
                    "text": "View in Detail",
                    "value": "detail",
                    "type": "button",
                }
            ]
        }
    ]
};

module.exports = openIssueTemplate;