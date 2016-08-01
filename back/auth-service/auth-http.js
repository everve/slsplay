require('dotenv').load();
var webTokenHelper = require('./../lib/web-token-helper');
var authHelper = require('./../lib/auth-helper');
var CognitoHelper = require('./../lib/cognito-helper');
var cognito = new CognitoHelper();

console.log('lambda loaded config', config);



/*
|--------------------------------------------------------------------------
| AWS invokes this method to process requests
|--------------------------------------------------------------------------
*/
exports.handler  = function(event, context, callback) {
  console.log('event', event);
 
  // /auth/{operation}
  var operation = event.operation;
  var payload = event.json ? event.json : event.payload; //todo - relies on idiosyncracy in the client text/plan and
  //serverless-offline - json at this point instead of raw string.

  
  var dataCallback = function(err, data) {
    if(err) {
      callback(JSON.stringify(authHelper.makeError(err)));
    }
    else {
      callback(null, data);
    }
  };
  
  var tokenCallback = function(err, data) {
//    console.log('tokenCallback err', err);
//    console.log('tokenCallback data', data);
    if(err) {
      callback(JSON.stringify(authHelper.makeError(err)));
    }
    else {
      callback(null, JSON.stringify({token: webTokenHelper.createJWT(data.id)}));
    }
  };
  
  if(operation === 'login') {
    cognito.login(payload.email, payload.password, payload.reset, 
        tokenCallback);
  }
  else if(operation === 'signup') {
    cognito.signup(payload.name, payload.email, payload.password, 
        tokenCallback);
  }
  else if(operation === 'me') {
    authHelper.ensureAuthenticated(event, function(userId) {
      cognito.getProfile(userId, dataCallback);
    });
  }
  else if(operation === 'credentials') {
    authHelper.ensureAuthenticated(event, function(userId) {
      cognito.getCredentials(userId, dataCallback);
    });
  }
  else if(operation === 'forgot') {
    cognito.forgotPassword(payload.email, dataCallback);
  }
  else if(operation === 'update') {
    authHelper.ensureAuthenticated(event, function(userId) {
      cognito.updatePassword(userId, payload.password, dataCallback);
    });
  }
  else if(operation === 'unlink') {
    authHelper.ensureAuthenticated(event, function(userId) {
      cognito.unlink(userId, payload.provider, null, dataCallback);
    });
  }
  else {
    var provider = operation;
    var userId = webTokenHelper.checkJWT(event.authorization, true);
    console.log('provider', provider);
    console.log('userId', userId);
    cognito.loginFederated(provider, 
        payload.code, payload.clientId, payload.redirectUri, userId, 
        tokenCallback);
  }
};
