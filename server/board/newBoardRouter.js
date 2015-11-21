var boardController = require('./boardController.js');

module.exports = function (app) {

  app.route('/')
    .get(boardController.createBoard);

};
