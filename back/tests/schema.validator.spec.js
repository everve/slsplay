/*************************************************************************
 * VALIDATE ALL SAMPLE SCHEMAS IN THE ../meetup-service/schema DIRECTORY *
 *************************************************************************/

var  schemaLoader = require('./lib/test-utils.js');
var test = require('blue-tape');
const Ajv = require("ajv");
var ajv = Ajv([]);

test('Check meetup schemas validate against samples.', function (t) {
    t.plan(2); //annoying find nicer way.
    schemaLoader.forEachJsonSchemaPair(__dirname + "/../meetup-service/schema",  (schema, json)=>{
        result = ajv.validate(JSON.parse(schema.content), JSON.parse(json.content));
        console.log(schema.name + "<=>" + json.name);
        console.log(ajv.errors);
        t.equal(result, true);

    });
});

test('Check invitees schemas validate against samples.', function (t) {
    t.plan(1); //annoying find nicer way.
    schemaLoader.forEachJsonSchemaPair(__dirname + "/../invitee-service/schema",  (schema, json)=>{
        result = ajv.validate(JSON.parse(schema.content), JSON.parse(json.content));
        console.log(schema.name + "<=>" + json.name);
        console.log(ajv.errors);
        t.equal(result, true);

    });
});

