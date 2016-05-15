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

const validate = ValidateFnFactory(schemas);

module.exports = {

          get: function(meetupId, handler){
              return db.get(meetupId, handler);
          }, 
    
          put: function(newMeetup, handler){
              var validationResults = validate(newMeetup);
              if(!validationResults.valid){
                handler(validationResults.errors, null);
              }else{
                  newMeetup.data.meetupId = uuid.v4();
                  var putMessage = {
                      TableName: tableName,
                      Item: newMeetup.data
                  };
                  db.put(putMessage, (err, data)=>{
                      if(err){
                          handler(err);
                      }else{
                          //we don't return the data from the DB
                          //we return the data which we accepted, validated and saved.
                          //is this ok?
                          handler(null, newMeetup)
                      }
                  });    
              }
              
          },
          getMany:{},
          update:{}



};
