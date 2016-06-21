exports.handler = function(event, context) {
    console.log(JSON.stringify(event, null, '  '));
    event.Records.forEach( (record )=>{
        console.log(record.eventID);
        console.log(record.eventName);
        console.log(record.dynamodb);
    });
    context.done(null, 'Processed');
};