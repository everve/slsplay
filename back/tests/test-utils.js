var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var _ = require('lodash');

function forEachFile(dir){
    return readFiles(dir)
}

function forEachJsonSchemaPair(dir, forEachPair) {
    readFiles(dir).then(filesByName => {
        var schemas = filesByName.filter(item => item.name.indexOf(".schema.")>-1) ;
        var samples = filesByName.filter(item => item.name.indexOf(".sample.")>-1) ;
        var sampleMap = _.keyBy(samples, entry => entry.name);
        return schemas.map(schema => {
            var sample = sampleMap[schema.name.replace(".schema.", ".sample.")];
            return {schema:schema, sample:sample}
        });
        
    }).then(schemaSamples =>{
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
            name => fs.readFileAsync(dirName + "/"+ name, "utf8")
                .then(content => {
                    return {name: name, content: content}
                })
        ).reduce((filesByName, nc) => {
            filesByName.push(nc);
            return filesByName;
        }, []
    );
}

module.exports = {
    forEachJsonSchemaPair: forEachJsonSchemaPair,
    forEachFile: forEachFile
};