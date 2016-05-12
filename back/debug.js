process.env.DEBUG = '*';

var S = require('serverless');
var serverless = new S({
  projectPath: process.cwd() + "/..",
  interactive: false
});

serverless.init().then(function() {
  serverless.command({
    _: ['offline', 'start', '--debug', '--debugOffline']
  });
});
