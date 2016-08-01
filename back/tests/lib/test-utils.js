var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var _ = require('lodash');
const jp = require('jsonpath');

function forEachFile(dir) {
    return readFiles(dir)
}

function forEachJsonSchemaPair(dir, forEachPair) {
    readFiles(dir).then(filesByName => {
        var schemas = filesByName.filter(item => item.name.indexOf(".schema.") > -1);
        var samples = filesByName.filter(item => item.name.indexOf(".sample.") > -1);
        var sampleMap = _.keyBy(samples, entry => entry.name);
        return schemas.map(schema => {
            var sample = sampleMap[schema.name.replace(".schema.", ".sample.")];
            return {schema: schema, sample: sample}
        });

    }).then(schemaSamples => {
        schemaSamples.forEach(ss=> {
            var schema = ss.schema;
            var sample = ss.sample;
            forEachPair(schema, sample);
        })
    });
}

function readFiles(dirName) {
    return fs.readdirAsync(dirName)
        .map(
            name => fs.readFileAsync(dirName + "/" + name, "utf8")
                .then(content => {
                    return {name: name, content: content}
                })
        ).reduce((filesByName, nc) => {
                filesByName.push(nc);
                return filesByName;
            }, []
        );
}

const symbolRep = /\${.*?}/g;

/*Processes the request data in the context of earlier responses replacing certain special keys
 * # single prefix hashes replace with json paths from response, whereas double prefix hashes
 * replace from header key value lookup..*/
function processForRefs(toReplaceIn, oldResponses) {
    //TODO FIX OLD RESPONSES CONTains token but not headere
    return toReplaceIn.replace(symbolRep, (toReplace) => {
        const tokenExpression = toReplace.substring(2, toReplace.length - 1);
        const backRefPathTuple = tokenExpression.split('#');
        const res = oldResponses[backRefPathTuple[0]];
        if(!res){
            throw Error("No result found at response index " + backRefPathTuple[0] + " size was " + oldResponses.length);
        } 
        if (backRefPathTuple[2] == '') {
            return res.headers[backRefPathTuple[1]];
        } else {
            return jp.query(res.body, backRefPathTuple[1], 1)[0];
        }
    });
}

module.exports = {
    forEachJsonSchemaPair: forEachJsonSchemaPair,
    forEachFile: forEachFile,
    processForRefs: processForRefs
};