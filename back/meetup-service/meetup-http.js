'use strict';
const db = require("./../lib/meetup-data.js");
const uuid = require("node-uuid");
const API_VERSION = 1;
const schemas = [require("./schema/meetup.1.schema.json")];
const ValidateFnFactory = require("./../lib/validateFns.js");
const validateSchema = ValidateFnFactory(schemas);
const handlerFns = require("./../lib/handlerFns.js").validator(validateSchema);

const verbHandlers = {
    "GET": function (event, context) {
        var meetupId = event.pathParams['meetupId'];
        var userId = event.queryParams['userId'];

        if (meetupId) { //TREAT AS GET ONE
            db.read(meetupId, function (err, results) {
                if (err) {
                    console.error(err);
                    handlerFns.handleError(context, 500, "Did not find meet-up:" + meetupId, API_VERSION);
                } else {
                    if(results.Count !==1){
                        console.error("Too many / few results returned for meetup Id:" + meetupId + ",count:"+results.Count);
                        handlerFns.handleError(context, 500, "Did not find single meet-up:" + meetupId, API_VERSION);
                    }else{
                        //TODO prune invitees delete results.Item.invitees
                        handlerFns.handleSuccess(context, results.Items[0], API_VERSION);
                    }

                }
            });
        } else if (userId) { //TREAT AS GET ALL MINE
            db.readAll(userId, function (err, results) {
                if (err) {
                    console.error(err);
                    handlerFns.handleError(context, 500, "Could not find meet-ups for" + userId, API_VERSION);
                } else {
                    //TODO pagination
                    //TODO status based (live, recently completed)
                    //TODO prune invitees unless owner.
                    handlerFns.handleSuccess(context, results.Items, API_VERSION);
                }
            });
        } else{
            //TODO get all public (probably in a elasticache? - for anon landing page etc)
            db.readAllPublic( function (err, results) {
                if (err) {
                    console.error(err);
                    handlerFns.handleError(context, 500, "Could not find all meet-ups", API_VERSION);
                } else {
                    handlerFns.handleSuccess(context, results.Items, API_VERSION);
                }
            });
            handlerFns.handleError(context, 500, "Not able to list Meet-ups for user: " + userId + " meetupId " + meetupId, API_VERSION);
        }
         },
    "POST": function (event, context) {
        var payload = event.json;

        var validationResults = validateSchema(payload);
        if (!validationResults.valid) {
            handlerFns.handleError(context, 500,  "Could not create meet-up.", event.json.data.correlationId, validationResults.errors);
        }
        payload.data.meetupId = uuid.v1();
        payload.data.state = "NEW";
        //TODO payload.data.userId //validate is same as current user / perm to create.
        //TODO validate email address formats if present (or can schema do this) - TEST
        db.create(payload.data, function (err, data) {
            if (err) {
                handlerFns.handleError(context, 500, "Could not create meet-up.", API_VERSION, payload.correlationId);
            } else {
                handlerFns.handleSuccess(context, payload.data, API_VERSION, payload.correlationId);
            }
        });
    },
    "PUT": function (event, context) {
        var payload = event.json;
        var validationResults = validateSchema(payload);
        if (!validationResults.valid) {
            handlerFns.handleError(context, 500,  validationResults.errors, API_VERSION, payload.correlationId);
        }
        //TODO should PUT support invitees too directly?
        db.update(payload.data, ['photoId', 'videoId','description', 'title'], function (err, data) {
            if (err) {
                handlerFns.handleError(context, 500,  err, API_VERSION, payload.correlationId);
            } else {
                //we pass back what we received...
                handlerFns.handleSuccess(context, data.Attributes, API_VERSION, payload.correlationId);
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
