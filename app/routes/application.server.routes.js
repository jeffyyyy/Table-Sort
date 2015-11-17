module.exports = function(app) {
	var application = require('../controllers/application.server.controller');
	
	app.get('/', application.index);
	// app.get('*', dashboard.index);
	// app.get('*', index.index);
};
