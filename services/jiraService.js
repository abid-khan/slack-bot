'use strict';
var config = require('../config/constants_dev');
var rp = require('request-promise');

var jiraService = {};

jiraService.openIssues = function(userId) {
    var url = config.openIssuesUrl + '?userId=' + userId;
    return rp.get(url);
};

module.exports = jiraService;
