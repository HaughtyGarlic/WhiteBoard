var Board = require('../../db/board');
var handleSocket = require('../sockets/sockets.js');
var path = require('path');

module.exports = {

  createBoard: function (req, res, next) {
    console.log('about to create board');
    var board = new Board.boardModel({name: req.body.name, strokes: []});
    var id = board._id.toString();
    board.save(function(err, board) {
      if (err) { console.error('error creating board',err); }
      else {
        console.log('board saved!');
        res.send({id:id});
      }
    });
    // Send new board id.

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
        console.log('i am an error',err);
        // res.redirect('/');
      } else {
        // Invoke [request handler](../documentation/sockets.html) for a new socket connection
        // with board id as the Socket.io namespace.
        console.log('board id', board);
        console.log('req.url: ', req.url);
        handleSocket(req.url, board, req.io);
        // Send back whiteboard html template.
        //res.sendFile(path.join(__dirname,'../../public/board.html'));
        // res.redirect('/#/room/'+id);
        res.send({id:id, board:board});
      }
    });

  },

  getActiveBoards: function (req, res, next) {

    Board.boardModel.find({name: { $ne: null }})
    .select('_id name activeUsers')
    .sort({activeUsers: -1})
    .exec(function(err, boards) {
      // console.log(err, boards);
      if (err) {
        console.log('i am an error',err);
      } else {
        res.send(boards);
      }
    });

  }

};
