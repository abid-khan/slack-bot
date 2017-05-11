'use strict';

var JiraUser = require('../models/jiraUser');

var jiraUserService = {};

jiraUserService.findById = function (id) {
    return JiraUser.findOne({userId : id}).where("accessToken").ne(null);
};

module.exports = jiraUserService;