'use strict';

var constants = require('../config/constants_dev');

var dummySingleIssueTemplate = {
    "text": "Issue - DUMMY SINGLE ISSUE",
    "attachments": [
        {
            "title": "DUMMY SINGLE ISSUE",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "fields": [
                {
                    "title": "Field 1",
                    "value": "1",
                    "short": true
                },
                {
                    "title": "Field 2",
                    "value": "1",
                    "short": true
                },
                {
                    "title": "Field 3",
                    "value": "1",
                    "short": true
                },
                {
                    "title": "Field 4",
                    "value": "1",
                    "short": true
                },
                {
                    "title": "Field 5",
                    "value": "1",
                    "short": true
                },
                {
                    "title": "Field 6",
                    "value": "1",
                    "short": true
                },
            ]
        }
    ]
};

module.exports = dummySingleIssueTemplate;