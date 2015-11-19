var Board = require('../../db/board');
var handleSocket = require('../sockets/sockets.js');
var path = require('path');

module.exports = {

  createBoard: function (req, res, next) {
    console.log('about to create board');
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
    console.log('trying to get the board');
    var id = String(req.params.id);

    console.log(id,'hiiiii');
    Board.boardModel.findOne({_id: id}, function(err, board) {
      // If the board doesn't exist, or the route is invalid,
      // then redirect to the home page.
      console.log(err, board);
      if (err) {
        res.redirect('/');
      } else {
        // Invoke [request handler](../documentation/sockets.html) for a new socket connection
        // with board id as the Socket.io namespace.
        console.log('board id', board);
        handleSocket(req.url, board, req.io);
        // Send back whiteboard html template.
        res.sendFile(path.join(__dirname,'../../public/board.html'));
      }
    });

  }

};
