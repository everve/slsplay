'use strict';
const service   = require("./meetup-db.js");

const verbHandlers = {
    "GET": function(event, context){
        var meetupId = event.pathParams['meetupId'];
        var userId = event.queryParams['userId'];
        if (meetupId && userId) {
            service.read(meetupId, userId, function(err, results){
                if (err) {
                    console.log(err);
                    context.done(JSON.stringify({errorCode: 500, reason: "Did not find meet-up:" + meetupId}));
                } else {
                    var data = results.Item
                    var response = {
                        apiVersion:1,
                        data: data
                    };
                    context.done(null, JSON.stringify(response));
                }
            });
        }else{
            context.done(JSON.stringify({errorCode: 500, reason: "We don't support listing all meet-ups yet." }));
        }
    },
    "POST": function(event, context){
      var payload = event.json;
        service.create(payload, function(err, data){
                if(data == null || err != null){
                    console.log(err);
                    context.done(JSON.stringify({errorCode: 500, reason: err}));
                }else{
                    context.done(null, JSON.stringify(data));
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
