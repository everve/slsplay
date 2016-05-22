'use strict';
const env = require("./environment.js");
const dyna = require("./dynamoFns.js");
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient(
    {service: new AWS.DynamoDB(env.dynamoConfig)}
);

module.exports = {
    create: function (newMeetup, handler) {
        var putMessage = {
            TableName: env.tables.meetupsByOwner,
            Item: newMeetup
        };
        db.put(putMessage, handler);
    },
    update: function (existingMeetup, whitelist, handler) {
        var updateMessage = {
            TableName: env.tables.meetupsByOwner,
            Item: existingMeetup,
            Key: {
                userId: existingMeetup.userId,
                meetupId: existingMeetup.meetupId
            },
            ReturnValues: "ALL_NEW"
        };
        Object.assign(updateMessage, dyna.updateByWhiteList(existingMeetup, whitelist));
        db.update(updateMessage, handler); //TODO This is to simulate an UPDATE, which requires
    },

    read: function (meetupId, handler) {
        var params = {
            TableName: env.tables.meetupsByOwner,
            IndexName: env.tables.meetupsByMeetupIdx,
            KeyConditionExpression: 'meetupId = :hkey',
            ExpressionAttributeValues: {
                ':hkey': meetupId
            }
        };

        db.query(params, handler);
    },

    readAll: function (userId, handler) {
        if (userId) {
            var params = {
                TableName: env.tables.meetupsByOwner,
                KeyConditionExpression: 'userId = :hkey',
                ExpressionAttributeValues: {
                    ':hkey': userId
                }
            };
            db.query(params, handler);
        }
    },
    readAllPublic: function (handler) {
        //TODO optimize
        var params = {
            TableName: env.tables.meetupsByOwner,
            IndexName: env.tables.meetupsByMeetupIdx,
            FilterExpression : 'visibility = :public && state =:live',
            ExpressionAttributeValues : {':public' : "PUBLIC", ":live" : "LIVE"}
        };
        db.scan(params, handler);
    }
};
