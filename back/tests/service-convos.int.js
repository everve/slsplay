/***********************************************************
 * EXECUTE AND VALIDATE ALL CONVERSATIONS IN tests/data    *
 ***********************************************************/

const utils = require('./lib/test-utils.js');
const jp = require('jsonpath');
const test = require('blue-tape');
const supertest = require('supertest');
const request = supertest('http://localhost:3000');


test("conversations suite", function (suite) {

    utils.forEachFile(__dirname + "/data").map(fc=> {

        console.log("Processing conversation from file: " + fc.name);
        var conversationData = JSON.parse(fc.content);

        console.log("Building conversation: " + conversationData.description);

        test("conversation test", function (testcase) {
            var responses = [];
            conversationData.conversation.forEach(dialogItem => {
                test(dialogItem.description, function (step) {
                    console.log(responses.length);
                    console.log("Starting..." + dialogItem.description);
                    var dialogRequest =  JSON.parse(utils.processForRefs(JSON.stringify(dialogItem.request), responses.map(r=>r.body)));
                    var verb = dialogRequest.httpVerb.toLowerCase();
                    var json = dialogRequest.json;
                    var queryVal = dialogRequest.query;
                    var url = dialogRequest.url;
                    var jsonPaths = dialogItem.response.jsonPaths;
                    var jsonSchema = dialogItem.response.jsonSchema;
                    var httpCode = dialogItem.response.httpCode;
                    if (json) {
                        request[verb](url)
                            .send(json)
                            .expect('Content-Type', /json/)
                            .expect(httpCode)
                            .end(function (err, res) {
                                jsonPaths.forEach(p=> {
                                    step.same(p.expected, jp.query(res.body, p.path)[0],p.path);
                                });
                                responses.push(res);
                                step.end();
                            });
                    } else {
                        request[verb](url)
                            .query(queryVal).
                            send()
                            .expect('Content-Type', /json/)
                            .expect(httpCode)
                            .end(function (err, res) {
                                jsonPaths.forEach(p=> {
                                    step.same(p.expected, jp.query(res.body, p.path)[0], p.path);
                                });
                                responses.push(res);
                                step.end();
                            });
                    }
                });

            });
            testcase.end();
        });
    }).then(()=> {
        suite.end();
    });
});