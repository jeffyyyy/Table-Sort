var request = require('request')
  , config = require(__dirname + '/../../config/' + app.get('env'))
;

exports.index = function(req, res, next) {
	res.render('index');
};

