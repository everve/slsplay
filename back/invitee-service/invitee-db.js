'use strict';
const env = require("../lib/environment.js");
const dyna = require("../lib/dynamoFns.js");
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient(
    {service: new AWS.DynamoDB(env.dynamoConfig)}
);
const tableName = env.tables.invitees;

module.exports = {
    create: function (item, handler) {
        var putMessage = {
            TableName: tableName,
            Item: item
        };
        db.put(putMessage, handler);
    },
    createMany: function(items, handler){
        var params = {
            RequestItems: {
                tableName: dyna.toPutRequests(items)
            }
        };
        db.batchWrite(params, handler);
    },
    
    update: function (item, whitelist, handler) {
        var updateMessage = {
            TableName: tableName,
            Item: item,
            Key: {
                userId: item.userId,
                meetupId: item.meetupId
            },
            ReturnValues: "ALL_NEW"
        };
        //todo make sure it is an update not insert... by validating.
        Object.assign(updateMessage, dyna.updateByWhiteList(item,whitelist));
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

    readAll: function (meetupId, handler) {
        var params = {
            TableName: tableName,
            KeyConditionExpression: 'meetupId = :hkey',
            ExpressionAttributeValues: {
                ':hkey': meetupId
            }
        };
        return db.query(params, handler);
    }
};
