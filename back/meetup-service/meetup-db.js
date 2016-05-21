'use strict';
const env = require("../lib/environment.js");
const dyna = require("../lib/dynamoFns.js");
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient(
    {service: new AWS.DynamoDB(env.dynamoConfig)}
);
const tableName = env.tables.meetups;


module.exports = {
    create: function (newMeetup, handler) {
        var putMessage = {
            TableName: tableName,
            Item: newMeetup
        };
        db.put(putMessage, handler);
    },
    update: function (existingMeetup, whitelist, handler) {
        var updateMessage = {
            TableName: tableName,
            Item: existingMeetup,
            Key: {
                userId: existingMeetup.userId,
                meetupId: existingMeetup.meetupId
            },
            ReturnValues: "ALL_NEW"
        };
        Object.assign(updateMessage, dyna.updateByWhitelist(existingMeetup,whitelist));
        return db.update(updateMessage, handler); //TODO This is to simulate an UPDATE, which requires
        //granular update expressions.
    },
    read: function (meetupId, userId, handler) {
        var getParams = {
            TableName: tableName,
            Key: {
                "meetupId": meetupId,
                "userId": userId
            }
        };
        return db.get(getParams, handler);
    },

    readAll: function (userId, handler) {
        var getParams = {
            TableName: tableName,
            Key: {
                "userId": userId
            }
        };
        return db.get(getParams, handler);
    }
};
