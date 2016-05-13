'use strict';
const env = require("../lib/environment.js");
const uuid = require("node-uuid");
const tableName = env.tables.meetups;

const Promise = require("bluebird");
const AWS = require("aws-sdk");

const db = new AWS.DynamoDB.DocumentClient(
    {service: new AWS.DynamoDB(env.dynamoConfig)}
);

const validate = function(){

};

module.exports = {

          get: function(meetupId, handler){
              return db.get(meetupId, handler);
          }, 
    
          put: function(newMeetup, handler){
              
              validate(newMeetup);
              var putMessage = {
                  TableName: tableName,
                  Item: {
                      meetupId: uuid.v4(),
                      userId: newMeetup.userId
                  }
              };
              return db.put(putMessage, handler);
          },
          getMany:{},
          update:{}



};
