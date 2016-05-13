'use strict';
const env       = require("../lib/environment.js");
const service   = require("./service.js");

const verbHandlers = {
    "GET": function(event, context){
        var meetupId = event.pathParams['meetupId'];
        if (meetupId) {
            service.get(meetupId, function(err, val){
                if (err) {
                    context.done(JSON.stringify({errorCode: 500, reason: "Did not find meetup:" + meetupId}));
                } else {
                    context.done(null, data);
                }
            });
        }else{
            context.done(JSON.stringify({errorCode: 500, reason: "We don't support listing all meetups yet." }));
        }
    },
    "POST": function(event, context){
      var payload = event.json;
        service.put(payload, function(err, data){
                if(data == null){
                    console.log(err);
                    context.done(JSON.stringify({errorCode: 500, reason: "Your best guess."}));
                }else{
                    console.log(data);
                    context.done(null, JSON.stringify({data: "You saved something"}));
                }
                if(err != null){
                    context.done(err);
                }
            });
    },
    "PATCH": function(event, context){
        
    }
};

module.exports.handler = function (event, context) {

    var verbHandler = verbHandlers[event.httpMethod];
    if(verbHandler){
        verbHandler(event, context);
    }else{
        context.done(JSON.stringify({errorCode: 400, reason: "Not allowed"}));
    }
};
