var Board = require('../../db/board');
var handleSocket = require('../sockets/sockets.js');

module.exports = {

  createBoard: function (req, res, next) {

    var board = new Board.boardModel({strokes: []});
    var id = board._id.toString();
    board.save(function(err, board) {
      if (err) { console.error(err); }
      else {
        console.log('board saved!');
      }
    });
    // Redirect to the new board.
    res.redirect('/' + id);

  },

  getBoard: function (req, res, next) {
    var id = req.params.id;
    Board.boardModel.findOne({id: id}, function(err, board) {
      // If the board doesn't exist, or the route is invalid,
      // then redirect to the home page.
      if (err) {
        res.redirect('/');
      } else {
        // Invoke [request handler](../documentation/sockets.html) for a new socket connection
        // with board id as the Socket.io namespace.
        handleSocket(req.url, board, req.io);
        // Send back whiteboard html template.
        res.sendFile(__dirname + '../../public/board.html');
      }
    });

  }

};
