var express = require('express')
  , session = require('express-session')
  , Session = require('connect-mongo')(session)
  , morgan = require('morgan')
  , compress = require('compression')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  // , passport = require('passport')
  , fs = require('fs')
  , logDirectory = __dirname + '/../logs'
;

module.exports = function() {
  var app = express();
  var config = require(__dirname + '/' + app.get('env'));

  app.config = config;
  global.app = app;
  // var accessLogStream = FileStreamRotator.getStream({
  //   filename: logDirectory + '/access-%DATE%.log',
  //   frequency: '1h',
  //   date_format: "YYYY-MM-DD",
  //   verbose: false
  // });
  app.use(morgan('dev'));
  
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({
    secret: config.session.secret,
    cookie: { maxAge: 14400000 },
    saveUninitialized: true,
    resave: true
  }));
  app.set('views', __dirname + '/../app/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('trust proxy');

  // app.use(passport.initialize());
  // app.use(passport.session());
  app.use(express.static('./public'));
  
  require('../app/routes/application.server.routes.js')(app);

  app.use(function(err, req, res, next) {
    res.send(500, "ERROR:"+err.message)
  });

  return app;
};
