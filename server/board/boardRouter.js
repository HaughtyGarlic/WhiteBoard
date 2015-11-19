var boardController = require('./boardController.js');

module.exports = function (app, io) {

  app.route('/new')
    .get(boardController.createBoard);

  app.use('/:id', function(req, res, next) {
  	req.io = io;
  	next();
  });

  app.route('/:id')
  	.get(boardController.getBoard);

};
