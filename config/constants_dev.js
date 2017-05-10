'use strict';

var constants = {};

constants.baseUrl = 'http://localhost:9090';
constants.openIssuesUrl = constants.baseUrl + '/api/jira/issues/myopen';
constants.convo = {
    openIssuesResponse : 'Here is a list of your open issues...',
    issueDetailButtonId : 'issueDetailButtonId'
}
constants.priority = {
    "Highest" : "#FF0000",
    "High" : "#FF9900",
    "Medium" : "#FFFF00",
    "Low" : "#7FFF00",
    "Lowest" : "#084381",
}

module.exports = constants;