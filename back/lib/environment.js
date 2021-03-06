'use strict';

const stage = process.env.SERVERLESS_STAGE;
const region = process.env.SERVERLESS_REGION;
const sessionToken = process.env.AWS_SESSION_TOKEN;
const project = process.env.SERVERLESS_PROJECT;
const offline = process.env.IS_OFFLINE;

const tables = {
    meetupsByOwner: project + '-meetupsByOwner-' + stage,
    meetupsByMeetupIdx: project + '-meetupsByMeetupIdx-' + stage,
    invitees: project + '-invitees-' + stage
};

const localDynamo = process.env.LOCAL_DDB_ENDPOINT;

const dynamoConfig = {
    sessionToken: sessionToken,
    region: region,
    maxRetries: 2
};

if (offline) {
	dynamoConfig.endpoint = localDynamo;
        dynamoConfig.credentials = { 
                   secretAccessKey: "LOCAL_TEST_KEY",
                   accessKeyId: "LOCAL_TEST_ACCESSKEY"
         }
}

console.log("Local end point used:" + dynamoConfig.endpoint);
console.log("Is offline? " + offline);


module.exports = {
	   	stage: stage,
    	region: region,
    	sessionToken: sessionToken,
    	project: project,
    	tables: tables,
    	offline: offline,
    	dynamoConfig: dynamoConfig
};
