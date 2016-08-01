const webTokenHelper = require('./web-token-helper');

var ensureAuthenticated = function(event, callback) {
    var authorization = event.authorizationToken;
    delete event.authorization;
    var t = webTokenHelper.checkJWT(authorization);
    if(t.message) {
        callback(JSON.stringify(makeError({code:401})));
    }
    else {
        callback(null, t);
    }
};

/*TODO unify with the non auth errors*/
var makeError = function(err) {
    var reason = 'Bad Request';
    switch(err.code) {
        case 404: reason = 'Not Found'; break;
        case 409: reason = 'Conflict'; break;
        case 401: reason = 'Unauthorized'; break;
    }
    return  {errorCode: err.code, reason: reason};
};

module.exports = {
    ensureAuthenticated : ensureAuthenticated,
    makeError : makeError
};