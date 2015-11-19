var boardController = require('./boardController.js');

module.exports = function (app, io) {

  app.use('/', function(req, res, next) {
    console.log('trying to get the board');
  	req.io = io;
  	next();
  });

  app.route('/:id')
  	.get(boardController.getBoard);

};
