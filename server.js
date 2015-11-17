/*!
 * Main Application Entry
 */

/**
 * Dependencies.
 */

var express = require('./config/express')
  , cluster = require('cluster')
  , fs = require('fs')
  , app = express()
  , config = require(__dirname + '/config/' + app.get('env'))
  , cpus = require('os').cpus().length
;

if (cluster.isMaster && app.get('env') !== 'development') {
  // Fork workers.
  for (var i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(deadWorker, code, signal) {
    //restart the worker
    var worker = cluster.fork();

    //Note the process IDs
    var newPID = worker.process.pid;
    var oldPID = deadWorker.process.pid;

    //log the event
    console.log('worker ' + oldPID + ' died.' + 'Code: ' + code + ', signal: ' + signal);
    console.log('worker ' + newPID + ' born.');
  });

  
} else {
  /**
   * Listen on configured port.
   */

  app.listen(config.server.port, function() {
    console.log('Server running at http://localhost:' + config.server.port + '/ on worker: ' + (cluster.worker ? cluster.worker.id : 1));
  });
}

process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  console.error(err.stack)
  process.exit(1);
});

/**
 * Export module.
 */

module.exports = app;
