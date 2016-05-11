'use strict';

const AWS       = require('aws-sdk');
const uuid      = require('node-uuid');
const HTTPError = require('node-http-error');
const env       = require("../lib/environment.js");


const dynamoConfig = {
    region: env.region
}

if (env.offline) dynamoConfig.endpoint = process.env.LOCAL_DDB_ENDPOINT;

const db = new AWS.DynamoDB.DocumentClient({service: new AWS.DynamoDB(dynamoConfig)});

console.log("Pot Handler environment loaded.");

module.exports.handler = function (event, context) {

    switch (event.httpMethod) {

        case "GET":
            // var potId = event.pathParams['potId'];
            // if (potId) {
            //     //Get individual pot:
            //     dynamo.getItem({TableName: "Pot", Item: event.body}, function (err, data) {
            //         if (err) {
            //             context.done(JSON.stringify({errorCode: 500, reason: "Did not find pot:" + potId}));
            //         } else {
            //             context.done(null, data);
            //         }
            //     });
            // }else{
            //     context.done(JSON.stringify({errorCode: 500, reason: "We don't support listing all pots yet." }));
            // }
            // break;

        case "POST":
            
            var putPotMessage = {
                    Item: {
                        potId:  uuid.v4(), // create a new pot.
                        userId: event.json.userId    
                    }, 
                    TableName: env.tables.pots
            };

            db.put(putPotMessage,function(err, data) {
		          if(err){
                    console.log(err);
                    context.done(JSON.stringify({errorCode: "Problem saving pot.", reason: "Your best guess."}));
                  }else{
                    console.log(data);
                    context.done(null, JSON.stringify({data: "You saved something"}));
                  }     
            });
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
