var AWS_SDK_MOCK = require('aws-sdk-mock');
AWS_SDK_MOCK.mock('CognitoIdentity', 'lookupDeveloperIdentity', function (params, callback) {

    if (
        params.DeveloperUserIdentifier == "exists@everve.com" ||
        params.DeveloperUserIdentifier == "login-invalid-password@everve.com"
    ) {
        callback(null, {IdentityId: 11111}); // already registered
    }else if (params.DeveloperUserIdentifier == "login-reset-failure@everve.com") {
        callback(null, {IdentityId: 22222}); // already registered
    }else if (params.DeveloperUserIdentifier == "login-reset-success@everve.com") {
        callback(null, {IdentityId: 33333}); // already registered
    }else if (params.DeveloperUserIdentifier == "login-success@everve.com") {
        callback(null, {IdentityId: 44444}); // already registered
    }else {
        callback("not found", null); //not registered
    }
});
//login-reset-success@everve.com
AWS_SDK_MOCK.mock('CognitoIdentity', 'getOpenIdTokenForDeveloperIdentity', function (params, callback) {
    if (params.Logins[config.COGNITO_DEVELOPER_PROVIDER_NAME] == "login-invalid-password@everve.com") {
        callback(null, {IdentityId: 11111});
    } else if(params.Logins[config.COGNITO_DEVELOPER_PROVIDER_NAME] == "login-reset-failure@everve.com") {
        callback(null, {IdentityId: 22222});
    } else if(params.Logins[config.COGNITO_DEVELOPER_PROVIDER_NAME] == "login-reset-success@everve.com") {
        callback(null, {IdentityId: 33333});
    } else if(params.Logins[config.COGNITO_DEVELOPER_PROVIDER_NAME] == "login-success@everve.com") {
        callback(null, {IdentityId: 44444});
    }else{
        callback(null, {IdentityId: 12345});
    }
});

AWS_SDK_MOCK.mock('CognitoSync', 'listRecords', function (params, callback) {
    var records = [];
    if (params.IdentityId == 11111) {
        records[0] = {Key:"password", Value: "notMatching"};
        callback(null, {Records: records}); //TODO.
    } else if (params.IdentityId == 22222) {
        records[0] = {Key:"reset", Value: "oooAReset"};
        callback(null, {Records: records}); //TODO.
    } else if (params.IdentityId == 33333) {
        records[0] = {Key:"reset", Value: "3fad9a982ef2b7caf1a324c45d3f908b44408203f7b7af8c7b4049c56179986d"}; //sha256 boggins2
        records[1] = {Key:"password", Value: "boggins"};
        callback(null, {Records: records}); //TODO.
    } else if (params.IdentityId == 44444) {
        records[0] = {Key:"password", Value: "f3afd88579d2e41a0a9f20d5e59932e690227b04b6806eda17965c7db5bb0401"};
        callback(null, {Records: records}); //TODO.
    } else {
        callback(null, {IdentityId: 12345}); //TODO.
    }
});

AWS_SDK_MOCK.mock('CognitoSync', 'updateRecords', function (params, callback) {
    callback(null, {IdentityId: 12345}); //TODO.
});
