'use strict';

const env = require('./environment.js');
const DynamoDB = require('aws-sdk').DynamoDB.DocumentClient(env.);

const dynamoConfig = {
  sessionToken:    env.sessionToken,
  region:          env.region
};

if (env.offline) dynamoConfig.endpoint = process.env.LOCAL_DDB_ENDPOINT;

const client = new DynamoDB.DocumentClient(dynamoConfig);

module.exports = (method, params) => {
  return Promise.fromCallback(cb => client[method](params, cb));
}
