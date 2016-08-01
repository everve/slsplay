/***********************************************************
 * EXECUTE AND VALIDATE ALL CONVERSATIONS IN tests/data    *
 ***********************************************************/

const utils = require('./lib/test-utils.js');
const jp = require('jsonpath');
const test = require('blue-tape');
const supertest = require('supertest');
const _ = require("lodash");
const request = supertest('http://localhost:3000');

/*JSON Path based and Regex based response validation of body.*/
function responseValidation(step, jsonPaths, fileName, dialogItem, responses) {
    return function (err, res) {
        if (err) {
            step.end(err);
        } else {
            jsonPaths.forEach(p=> {
                var val = jp.query(res.body, p.path)[0];
                if (p.matches) {
                    step.assert(new RegExp(p.matches).test(val), fileName + " " + p.path + " was '" + val + "' for regex " + p.matches + " " + dialogItem.description);
                } else {
                    step.same(val, p.expected, fileName + " " + p.path + " " + dialogItem.description);
                }
            });
            responses.push(res);
            step.end();
        }
    };
}

/*Does an indiviudal request response pair*/
function testDialogItem(tab, dialogItem, responses, fileName) {
    test(dialogItem.description, function (step) {
        console.log(responses.length);
        console.log(tab+"Starting..." + dialogItem.description + " from " + fileName);

        dialogItem = JSON.parse(utils.processForRefs(JSON.stringify(dialogItem), responses.map(r=>r)));
        var dialogRequest = dialogItem.request;
        var verb = dialogRequest.httpVerb.toLowerCase();
        var json = dialogRequest.json;
        var queryVal = dialogRequest.query;
        var url = dialogRequest.url;
        var jsonPaths = dialogItem.response.jsonPaths;
        var jsonSchema = dialogItem.response.jsonSchema; //todo
        var httpCode = dialogItem.response.httpCode;
        var req =
            json ?
                request[verb](url).send(json)
                :
                request[verb](url).query(queryVal);
        if(dialogItem.request.headers){
            _.forOwn(dialogItem.request.headers,(v,k)=>{
                req.set(k,v);
            });
        }
        req
            .expect('Content-Type', /json/)
            .expect(httpCode)
            .end(responseValidation(step, jsonPaths, fileName, dialogItem, responses));
    });
}

function converse(tab, conversationData, conversations, responses, fileName) {

    if (conversationData.previousRequiredSteps) {
        conversationData.previousRequiredSteps.forEach(previousStep => {
            converse(tab+"  ", conversations[previousStep], conversations, responses, fileName);
        });
    }

    conversationData.conversation.forEach(dialogItem => {
        testDialogItem(tab, dialogItem, responses, fileName);
    });
}

function testConversation(fileName, conversationData, conversations) {
    if (!conversationData.disabled) {
        test("conversation test", function (testcase) {
            var responses = [];
            converse("",conversationData, conversations, responses, fileName);
            testcase.end();
        });
    }
}

/*loads a map of fileName to JSON for relevant test cases*/
function loadConversations(suite, thenRun) {
    var conversations = {};
    utils.forEachFile(__dirname + "/data").map(fc => {
            console.log("Processing conversation from file: " + fc.name);
            if (fc.name.indexOf("convo") > -1) {
                conversations[fc.name] = JSON.parse(fc.content);
            }
        }
    ).then(()=> {
        thenRun(conversations);
    }).then(()=> {
        suite.end();
    });
}

/*Suite for all the conversations*/
test("conversations suite", function (suite) {
    loadConversations(suite, (conversations)=> {
        _.forOwn(conversations, (jsonConversation, fileName)=> {
            testConversation(fileName, jsonConversation, conversations);
        });
    });

});
