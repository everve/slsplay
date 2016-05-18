'use strict';
const env = require("../lib/environment.js");
const ValidateFnFactory = require("../lib/validateFns.js");

const AWS = require("aws-sdk");
const uuid = require("node-uuid");

const tableName = env.tables.meetups;

const schemas = [require("./schema/meetup.1.schema.json")];

const db = new AWS.DynamoDB.DocumentClient(
    {service: new AWS.DynamoDB(env.dynamoConfig)}
);

const validateSchema = ValidateFnFactory(schemas);

module.exports = {
    
    create: function (newMeetup, handler) {
        var validationResults = validateSchema(newMeetup);
        if (!validationResults.valid) {
            handler(validationResults.errors, null);
        } else {
            newMeetup.data.meetupId = uuid.v1();
            newMeetup.data.state = "NEW";
            var putMessage = {
                TableName: tableName,
                Item: newMeetup.data
            };
            db.put(putMessage, (err, data)=> {
                if (err) {
                    handler(err);
                } else {
                    //we don't return the data from the DB
                    //we return the data which we accepted, validated and saved.
                    //is this ok - eventually consistent?
                    handler(null, newMeetup)
                }
            });
        }
    },
    read: function (meetupId, handler) {
        var getParams = {
            TableName: tableName,
            Key:{
                "meetupId": meetupId,
                "userId": userId
            }
        };
        return db.get(getParams, handler);
    },

    update: function (existingMeetup, handler) {
        var validationResults = validate(existingMeetup);
        if (!validationResults.valid) {
            handler(validationResults.errors, null);
        }
        //don't allow status to be changed:
        //don't allow user to be changed:
        var updateMessage = {
            TableName: tableName,
            Item: existingMeetup.data
        };
      //  db.update(updateMessage,);
    }



};
