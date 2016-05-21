'use strict';
const db = require("./meetup-db.js");
const uuid = require("node-uuid");
const API_VERSION = 1;
const schemas = [require("./schema/meetup.1.schema.json")];
const ValidateFnFactory = require("../lib/validateFns.js");
const validateSchema = ValidateFnFactory(schemas);

function handleError(context, code, reason, version, correlation) {
    correlation = correlation ? correlation : uuid.v1(); //if we don't have one simulate one for logging.
    console.error(reason + "[" + correlation + "]");
    context.done(JSON.stringify(
        {
            errorCode: code, //pattern matched by API Gateway.
            reason: reason,
            apiVersion: version,
            correlationId: correlation
        }
    ));
}

function handleSuccess(context, data, version, correlation) {
    correlation = correlation ? correlation : uuid.v1(); //if we don't have one simulate one for logging.
    console.log("Success:" + "[" + correlation + "]");
    var result = {
        apiVersion: version,
        correlationId: correlation,
        data: data
    };
    //strictly we also validate our outbound
    var validationResults = validateSchema(result);
    if (!validationResults.valid) {
        handleError(context, 500,  "Could not create meet-up.", result.correlationId, validationResults.errors);
    }else{
        context.done(null, JSON.stringify(result));
    }
}

const verbHandlers = {
    "GET": function (event, context) {
        var meetupId = event.pathParams['meetupId'];
        var userId = event.queryParams['userId'];//todo - should be from context or redirect.

        if (meetupId && userId) { //TREAT AS GET ONE
            db.read(meetupId, userId, function (err, results) {
                if (err) {
                    handleError(context, 500, "Did not find meet-up:" + meetupId, API_VERSION);
                } else {
                    handleSuccess(context, results.Item, API_VERSION);
                }
            });
        } else if (userId) { //TREAT AS GET MINE!
            db.readAll(userId, function (err, results) {
                if (err) {
                    handleError(context, 500, "Could not find meet-ups for" + userId, API_VERSION);
                } else {
                    //TODO Items? multiple
                    handleSuccess(context, results.Item, API_VERSION);
                }
            });
        } else{
            //TODO above we have getOne, getAllMine, we need getAllPublic too...at least.
            handleError(context, 500, "Not able to list Meet-ups for user: " + userId + " meetupId " + meetupId, API_VERSION);
        }
         },
    "POST": function (event, context) {
        var payload = event.json;

        var validationResults = validateSchema(payload);
        if (!validationResults.valid) {
            handleError(context, 500,  "Could not create meet-up.", event.json.data.correlationId, validationResults.errors);
        }
        payload.data.meetupId = uuid.v1();
        payload.data.state = "NEW";
        //TODO payload.data.userId //validate is same as current user / perm to create.
        db.create(payload.data, function (err, data) {
            if (err) {
                handleError(context, 500, "Could not create meet-up.", API_VERSION, payload.correlationId);
            } else {
                handleSuccess(context, payload.data, API_VERSION, payload.correlationId);
            }
        });
    },
    "PUT": function (event, context) {
        var payload = event.json;
        var validationResults = validateSchema(payload);
        if (!validationResults.valid) {
            handleError(context, 500,  validationResults.errors, API_VERSION, payload.correlationId);
        }
        db.update(payload.data, ['photoId', 'videoId','description', 'title'], function (err, data) {
            if (err) {
                handleError(context, 500,  err, API_VERSION, payload.correlationId);
            } else {
                //we pass back what we received...
                handleSuccess(context, data.Attributes, API_VERSION, payload.correlationId);
            }
        });
    }
};

module.exports.handler = function (event, context) {
    var verbHandler = verbHandlers[event.httpMethod];
    if (verbHandler) {
        verbHandler(event, context);
    } else {
        context.done(JSON.stringify({errorCode: 400, reason: "Not allowed"}));
    }
};
