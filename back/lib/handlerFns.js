const uuid = require("node-uuid");

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

function handleSuccess(validateSchemaFn, context, data, version, correlation) {
    correlation = correlation ? correlation : uuid.v1(); //if we don't have one simulate one for logging.
    console.log("Success:" + "[" + correlation + "]");
    var result = {
        apiVersion: version,
        correlationId: correlation,
        data: data
    };
    //strictly we also validate our outbound
    var validationResults = validateSchemaFn(result);
    if (!validationResults.valid) {
        handleError(context, 500, "Could not create.", result.correlationId, validationResults.errors);
    } else {
        context.done(null, JSON.stringify(result));
    }
}

module.exports.validator = function (validatorFns) {
    return {
        handleSuccess: handleSuccess.bind(null, validatorFns),
        handleError: handleError
    }
}