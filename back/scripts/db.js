process.env.DEBUG = '*';
var args = process.argv.slice(2);
var S = require('serverless');

var serverless = new S({
  projectPath: __dirname + "/../..",
  interactive: false
});

serverless.init().then(function() {
  serverless.command({
    _: [
      'setup',
      'db'],
    stage: args[0],
    region: args[1]
  });
});
