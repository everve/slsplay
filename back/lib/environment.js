'use strict';

const stage = process.env.SERVERLESS_STAGE;
const region = process.env.SERVERLESS_REGION;
const sessionToken = process.env.AWS_SESSION_TOKEN;
const project = process.env.SERVERLESS_PROJECT;
const offline = process.env.IS_OFFLINE;
const tables = {
    pots: project + '-pots-' + stage
};

const localDynamo = process.env.LOCAL_DDB_ENDPOINT;

module.exports = {
    stage: stage,
    region: region,
    sessionToken: sessionToken,
    project: project,
    tables: tables,
    offline: offline,
    localDynamo: localDynamo
};
