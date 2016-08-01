var moment = require('moment');
var config = require('./server-config');
var jwt = require('jwt-simple');

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(userId, expiresIn) {
    var exp;
    if(config.EXPIRES_IN) {
        exp = moment().add(config.EXPIRES_IN, 'seconds');
    }
    else if(expiresIn) {
        exp = moment().add(expiresIn, 'seconds');
    }
    else {
        exp = moment().add(14, 'days');
    }
    console.log('createJWT exp', exp.format());

    var payload = {
        sub: userId,
        iat: moment().unix(),
        exp: exp.unix()
    };
    console.log('createJWT payload', payload);

    return jwt.encode(payload, config.TOKEN_SECRET);
}

/*
 |--------------------------------------------------------------------------
 | Verify JWT token for authenticated requests
 |--------------------------------------------------------------------------
 */
function checkJWT(authorization, dontFail) {
    if (!authorization) {
        if(dontFail) {
            return null;
        }
        else {
            return {code: 401, message: 'Missing Authorization header'};
        }
    }
    var token = authorization.split(' ')[1];
    var payload = jwt.decode(authorization, config.TOKEN_SECRET);
    console.log('checkJWT', payload);
    var now = moment().unix();
    console.log('checkJWT', 'exp=' + payload.exp + ' now=' + now);
    if (payload.exp <= now - 60) {
        if(dontFail) {
            return null;
        }
        else {
            return {code: 401, message: 'Token has expired'};
        }
    }
    return payload.sub;
}

module.exports = {
    checkJWT : checkJWT,
    createJWT : createJWT
}