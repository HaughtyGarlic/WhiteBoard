
module.exports = {

	getDocumentation: function(req, res, next) {
		res.sendFile(__dirname + '../../docs/tableofcontents.html');
	}

};