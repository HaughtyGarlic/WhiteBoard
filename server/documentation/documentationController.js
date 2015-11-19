var path = require('path');

module.exports = {

	getDocumentation: function(req, res, next) {
		console.log('routed to doc, about to serve');
		// console.log(path.join(__dirname,'/../../docs/tableofcontents.html'));
		res.sendFile(path.join(__dirname,'/../../docs/tableofcontents.html'));
	}

};