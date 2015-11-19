var documentationController = require('./documentationController.js');

module.exports = function (app) {
	
  app.route('/')
    .get(documentationController.getDocumentation);

};
