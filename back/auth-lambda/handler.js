'use strict';
const CognitoHelper = require('../lib/cognito-helper');
const cognito = new CognitoHelper();
const authHelper = require('../lib/auth-helper');

/*
* An authorizer without a gateway for validating other lambdas via a JWT 
* tokens and retrieving appropriate AWS role information from Cognito.
* */
function authorize(event, context, callback){
    var dataCallback = function(err, data) {
        if(err) {
            callback(JSON.stringify(authHelper.makeError(err)));
        }
        else {
            callback(null, data);
        }
    };

    authHelper.ensureAuthenticated(event, (e, userId)=>{
        if(e){
            dataCallback(e); 
        }
        
        return cognito.getCredentials(userId, dataCallback);
    });
}

module.exports.handler = authorize;