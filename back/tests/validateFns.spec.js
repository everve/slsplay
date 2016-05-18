var Validator = require('./../lib/validateFns.js');
var test = require('blue-tape');
var schemas = [
    {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
            "apiVersion": {
                "type": "integer"
            },
            "prop": {
                "type": "string"
            }
        },
        "required": [
            "apiVersion",
            "prop"
        ]
    },  {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
            "apiVersion": {
                "type": "integer"
            },
            "propNameChange": {
                "type": "string"
            }
        },
        "required": [
            "apiVersion",
            "propNameChange"
        ]
    }];

var validate = Validator(schemas);


test('correct version + correct properties', function (t) {
    t.true(validate({apiVersion: 1, prop:"value"}).valid);
    t.end();
});

test('correct version + correct properties', function (t) {
    t.true(validate({apiVersion: 2, propNameChange:"value"}).valid);
    t.end();
});

test('wrong version', function (t) {
    t.false(validate({apiVersion: 1, propNameChange:"value"}).valid);
    t.end();
});

test('wrong version type', function (t) {
    t.false(validate({apiVersion: "1", prop:"value"}).valid);
    t.end();
});

test('wrong properties', function (t) {
    t.false(validate({apiVersion: 1, propName:"value", additional: "not allowed"}).valid);
    t.end();
});

