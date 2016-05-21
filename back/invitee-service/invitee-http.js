'use strict';
const db = require("./invitee-db.js");
const uuid = require("node-uuid");
const API_VERSION = 1;
const schemas = [require("./schema/invitee.1.schema.json")];
const ValidateFnFactory = require("../lib/validateFns.js");
const validateSchema = ValidateFnFactory(schemas);
const handlerFns = require("../lib/handlerFns.js").validator(validateSchema);

const verbHandlers = {
    "GET": function (event, context) {
        var meetupId = event.pathParams['meetupId'];
        if (meetupId) { //TREAT AS GET ONE
            db.readAll(meetupId, function (err, results) {
                if (err) {
                    handlerFns.handleError(context, 500, "Did not find invitees for meetup:" + meetupId, API_VERSION);
                } else {
                    handlerFns.handleSuccess(context, results.Item, API_VERSION);
                }
            });
        } else {
            //TODO above we have getOne, getAllMine, we need getAllPublic too...at least.
            handlerFns.handleError(context, 500, "Not able to list Meet-ups for user: " + userId + " meetupId " + meetupId, API_VERSION);
        }
    },
    "POST": function (event, context) {
        var payload = event.json;
        var meetupId = event.pathParams['meetupId'];
        var validationResults = validateSchema(payload);
       if(meetupId && payload && payload.data){
        //defaults on initial create
        payload.data = payload.data.map((item=>{
            item.requestState = "ADDED";
            item.meetupId = meetupId;
            item.version = 1;
            item.reminderRequested= 0;
            item.rsvpState = "UNKNOWN";
            return item}));


        if (!validationResults.valid) {
            handlerFns.handleError(context, 500, "Could not create invitees",
                event.json.data.correlationId, validationResults.errors);
        }
        db.createMany(payload.data, function(err, data) {
            if (err) {
                handlerFns.handleError(context, 500, "Could not create invitees", API_VERSION, payload.correlationId);
            } else {
                handlerFns.handleSuccess(context, payload.data, API_VERSION, payload.correlationId);
            }
        });
       }else{
           handlerFns.handleError(context, 500, "Could not create invitees.", API_VERSION, payload.correlationId);
       }
    },
    "PUT": function (event, context) {
        var payload = event.json;
        var validationResults = validateSchema(payload);
        if (!validationResults.valid) {
            handleError(context, 500, validationResults.errors, API_VERSION, payload.correlationId);
        }
        db.update(payload.data, ['photoId', 'videoId', 'description', 'title'], function (err, data) {
            if (err) {
                handlerFns.handleError(context, 500, err, API_VERSION, payload.correlationId);
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
