/***********************************************************
 * EXECUTE AND VALIDATE ALL CONVERSATIONS IN tests/data    *
 ***********************************************************/

var fileLoader = require('./test-utils.js');
var jp = require('jsonpath');
var test = require('blue-tape');
var supertest = require('supertest');
var request = supertest('http://localhost:3000');

test("conversations suite", function (suite) {

    fileLoader.forEachFile(__dirname + "/data").map(fc=> {

        console.log("Processing conversation from file: " + fc.name);
        var conversationData = JSON.parse(fc.content);

        console.log("Building conversation: " + conversationData.description);

        test("conversation test", function (testcase) {

            conversationData.conversation.forEach(dialogItem => {
                console.log("Starting..." + dialogItem.description);
                var verb = dialogItem.request.httpVerb.toLowerCase();
                var json = dialogItem.request.json;
                var url = dialogItem.request.url;
                var jsonPaths = dialogItem.response.jsonPaths;
                var jsonSchema = dialogItem.response.jsonSchema;
                var httpCode = dialogItem.response.httpCode;


                test(dialogItem.description, function (step) {
                    if (json) {
                        request[verb](url)
                            .send(json)
                            .expect('Content-Type', /json/)
                            .expect(httpCode)
                            .end(function (err, res) {
                                jsonPaths.forEach(p=> {
                                    step.same(p.expected, jp.query(res.body, p.path)[0]);
                                });
                                step.end();
                            });

                    } else {
                        request[verb](url)
                            .send()
                            .expect('Content-Type', /json/)
                            .expect(httpCode)
                            .end(function (err, res) {
                                jsonPaths.forEach(p=> {
                                    step.same(p.expected, jp.query(res.body, p.path,1)[0]);
                                });
                                step.end();
                            });
                    }
                });
                testcase.end();
        });

    })
    }).then(()=> {
        suite.end();
    });
});