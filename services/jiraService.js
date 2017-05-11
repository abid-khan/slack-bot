'use strict';
let config = require('../config/constants_dev');
let rp = require('request-promise');
let dateFormat = require('dateformat');
let templates = require('../vo/common/templates');
let constants = require('../config/constants_dev');


let jiraService = {};

jiraService.getAllOpenIssues = function(userId, typeId, convo) {
    let url = config.allIssuesUrl + '?userId=' + userId + '&type=' + typeId;
    console.log(url);
    rp.get(url).then(function (response, body) {
        console.log("Issue from Jira" + response);
        let issues = JSON.parse(response).issues;
        convo.say(buildIssueListResponse(issues));
    }).catch(function (err) {
        convo.say(buildfailureResponse(err));
    });
};

jiraService.getOpenIssueById = function(userId, jiraId, convo) {
    let url = config.allIssuesUrl + "/" + jiraId +'?userId=' + userId;
    console.log(url);
    rp.get(url).then(function (response, body) {
        console.log("Issue from Jira" + response);
        let issue = JSON.parse(response);
        convo.say(buildIssueResponse(issue));
    }).catch(function (err) {
        console.log(err);
        convo.say(buildfailureResponse(err));
    });
};


jiraService.getCommentsForIssue = function(userId, jiraId, convo) {
    let url = config.allIssuesUrl + "/" + jiraId +'/comments?userId=' + userId;
    console.log(url);
    rp.get(url).then(function (response, body) {
        console.log("Comments from Jira" + response);
        let resp = JSON.parse(response);
        convo.say(buildCommentResponse(resp));
        //convo.say(buildIssueResponse(issue));
    }).catch(function (err) {
        convo.say(buildfailureResponse(err));
    });
};


jiraService.askMoreQuestions = function(userId, convo) {
    convo.ask(askMoreQuestions(userId));
};

let askMoreQuestions = (userId) => {
    let header = new templates.templateHead(constants.convo.issue.undecidedText, []);
    let body = new templates.templateBody("Select one!", "", constants.priority.Low, constants.convo.issue.undecidedTextId , [], []);
    body.actions = [
        new templates.templateAction(constants.convo.issue.ihavebeenmentionedId, constants.convo.issue.ihavebeenmentioned, "", "button"),
        new templates.templateAction(constants.convo.issue.iamassignedId, constants.convo.issue.iamassigned, "", "button"),
        new templates.templateAction(constants.convo.issue.reportedbymeId, constants.convo.issue.reportedbyme, "", "button"),
    ]
    header.attachments.push(body);
    return header;
};

let buildIssueListResponse = (issues) => {
    let issueHeader = new templates.templateHead(constants.convo.openIssuesResponse, []);
    for(let index in issues) {
        let issue = issues[index];
        let issueBody = new templates.templateBody(issue.key, issue.summary, constants.priority[issue.priority], constants.convo.issueDetailButtonId , [], []);
        let issueField1 = new templates.templateField("Reporter", issue.reporter.name, true);
        let issueField2 = new templates.templateField("Priority", issue.priority, true);
        issueBody.fields.push(issueField1, issueField2);
        let issueDetailAction = new templates.templateAction(issue.key, constants.convo.issueDetailButtonText, "", "primary");
        issueBody.actions.push(issueDetailAction);
        issueHeader.attachments.push(issueBody);
    }
    return issueHeader;
};

let buildCommentResponse = (comments) => {
    if(comments.length == 0 )
        return new templates.templateHead(constants.convo.comment.noCommentFound, []);
    else {
        let commentHeader = new templates.templateHead(comments.length + constants.convo.comment.commentsFound, []);
        for(let index in comments) {
            let comment = comments[index];
            let commentBody = new templates.templateBody(comment.body , '', constants.convo.comment.color, '', [], []);
            commentBody.fields = [new templates.templateField("Author", comment.auther.name, false),
                                    new templates.templateField("Created Date", formatDate(comment.createdDate), true),
                                        new templates.templateField("Updated Date", formatDate(comment.updatedDate), true)]

            commentHeader.attachments.push(commentBody);
        }
        return commentHeader
    }
}

let buildIssueResponse = (issue) => {
    let issueHeader = new templates.templateHead(constants.convo.issue.text + ' ' + issue.key, []);
    let issueBody = new templates.templateBody(issue.summary, issue.description, constants.priority[issue.priority], null, [], []);
    let issueFields = [ new templates.templateField("Id", issue.key, true),
                        new templates.templateField("Reporter", issue.reporter.name, true),
                        new templates.templateField("Priority", issue.priority, true),
                        new templates.templateField("Project", issue.project.name, true),
                        new templates.templateField("Status", issue.status, true),
                        new templates.templateField("Assignee", issue.assignee.name, true),
                        new templates.templateField("CreatedDate", formatDate(issue.createdDate), true),
                        new templates.templateField("Due Date", formatDate(issue.dueDate), true),

                     ];

    issueBody.fields = issueFields;
    issueHeader.attachments.push(issueBody);
    return issueHeader;
};

let buildfailureResponse = (err) => {
    return new templates.templateHead(constants.convo.issue.errorText + '`' + err.message + '`', []);
};

let formatDate = (date)=>{
    return date == null ? null : dateFormat(date , "mmmm dS, yyyy");
};

module.exports = jiraService;
