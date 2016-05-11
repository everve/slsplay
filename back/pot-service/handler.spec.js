var lambdaFunc = require('./handler.js');
var lambda = require('lambda-wrapper').wrap(lambdaFunc);
var test = require('blue-tape');

test('pot-service', function (te) {

    test('When receives DELETE', function (t) {
        var event = {httpMethod: 'DELETE'};
        lambda.run({Payload: event}, function (err, response) {
            t.plan(1);
            t.equal(typeof err,"string", "should error of type string");
        });
    });
    te.end();
});


