var boardController = require('./boardController.js');

module.exports = function (app, io) {

  app.use('/:id', function(req, res, next) {
    console.log('trying to get the board');
    console.log(req.params);
  	req.io = io;
  	next();
  });

  app.route('/')
  	.get(boardController.getBoard);

};
