/***********************************************************
 * EXECUTE AND VALIDATE ALL CONVERSATIONS IN tests/data    *
 ***********************************************************/

const utils = require('./lib/test-utils.js');
const jp = require('jsonpath');
const test = require('blue-tape');
const supertest = require('supertest');
const request = supertest('http://localhost:3000');


function responseValidation(step, jsonPaths, fc, dialogItem, responses) {
    return function (err, res) {
        if (err) {
            step.end(err);
        } else {
            jsonPaths.forEach(p=> {
                var val = jp.query(res.body, p.path)[0];
                if (p.matches) {
                    step.assert(new RegExp(p.matches).test(val), fc.name + " " + p.path + " was '" + val + "' for regex " + p.matches + " " + dialogItem.description);
                } else {
                    step.same(val, p.expected, fc.name + " " + p.path + " " + dialogItem.description);
                }
            });
            responses.push(res);
            step.end();
        }
    };
};
test("conversations suite", function (suite) {

    utils.forEachFile(__dirname + "/data").map(fc=> {

        console.log("Processing conversation from file: " + fc.name);
        if (fc.name.indexOf("convo") > -1) {
            var conversationData = JSON.parse(fc.content);

            console.log("Building conversation: " + conversationData.description);
            if (!conversationData.disabled) {
                test("conversation test", function (testcase) {
                    var responses = [];
                    conversationData.conversation.forEach(dialogItem => {
                        test(dialogItem.description, function (step) {
                            console.log(responses.length);
                            console.log("Starting..." + dialogItem.description);

                            dialogItem = JSON.parse(utils.processForRefs(JSON.stringify(dialogItem), responses.map(r=>r.body)));
                            var dialogRequest = dialogItem.request;
                            var verb = dialogRequest.httpVerb.toLowerCase();
                            var json = dialogRequest.json;
                            var queryVal = dialogRequest.query;
                            var url = dialogRequest.url;
                            var jsonPaths = dialogItem.response.jsonPaths;
                            var jsonSchema = dialogItem.response.jsonSchema; //todo
                            var httpCode = dialogItem.response.httpCode;
                            if (json) {
                                request[verb](url)
                                    .send(json)
                                    .expect('Content-Type', /json/)
                                    .expect(httpCode)
                                    .end(responseValidation(step, jsonPaths, fc, dialogItem, responses));
                            } else {
                                request[verb](url)
                                    .query(queryVal).send()
                                    .expect('Content-Type', /json/)
                                    .expect(httpCode)
                                    .end(responseValidation(step, jsonPaths, fc, dialogItem, responses));
                            }
                        });

                    });
                    testcase.end();
                });
            }
        }
    }).then(()=> {
        suite.end();
    });
});