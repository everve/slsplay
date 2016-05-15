process.env.DEBUG = '*';

var S = require('serverless');
var serverless = new S({
  projectPath: __dirname + "/../..",
  interactive: false
});

serverless.init().then(function() {
  serverless.command({
    _: ['offline','start']
  });
});
