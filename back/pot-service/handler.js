'use strict';

const AWS = require('aws-sdk');
const uuid = require('node-uuid');
const  HTTPError = require('node-http-error');

const env = require("../lib/environment.js");
const db = require("../lib/dynamodb.js");


module.exports.handler = function (event, context) {

    switch (event.httpMethod) {
        case "GET":
            var potId = event.pathParams['potId'];
            if (potId) {
                //Get individual pot:
                dynamo.getItem({TableName: "Pot", Item: event.body}, function (err, data) {
                    if (err) {
                        context.done(JSON.stringify({errorCode: 500, reason: "Did not find pot:" + potId}));
                    } else {
                        context.done(null, data);
                    }
                });
            }else{
                context.done(JSON.stringify({errorCode: 500, reason: "We don't support listing all pots yet." }));
            }
            break;

        case "POST":
            var key = uuid.v4();
            var content = {
                key: key,
                user: event.json.userId,
                raw: event.json
            };
            db('put', {
		                TableName: env.tables.pots,
                        Item: content
            }).then((res) => res);
            break;

        case "PATCH":
            context.fail('pending implementation' + event.httpMethod);
            break;
        default:
            //TODO test with real gateway to see if it fails.
            context.done(JSON.stringify({errorCode: 400, reason: "Not allowed"}));
            //context.fail(new HTTPError(405, event.httpMethod + " Method Not Allowed"));
            break;
    }
};
