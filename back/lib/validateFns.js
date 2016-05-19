'use strict';
const Ajv = require("ajv");
const ajv = Ajv([]); // options can be passed, e.g. {allErrors: true}
const TypeFns = require("./typeFns.js");

const validate = function validate(schema, json) {
    var valid = ajv.validate(schema, json);
    if (!valid) {
        return {valid: false, errors: ajv.errors}
    }
    return {valid: true};
};

const validateByVersion = function (validatorsByVersion, json) {
    if (TypeFns.isInteger(json.apiVersion) && json.apiVersion > 0) {
        var validate = validatorsByVersion[json.apiVersion-1];
        if (validate) {
            return validate(json);
        }
    }
    return {valid: false, errors: "apiVersion not supported: " + json.apiVersion};
};

/*returns a function which can validate jsons and will look up the schemas*/
module.exports = function(schemas){
        return (json) => validateByVersion(schemas.map(
            (schema) => (json) => validate(schema, json)
        ),json);
    };
