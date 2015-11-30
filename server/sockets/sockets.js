// # Socket Connection Handler

// ##### [Back to Table of Contents](./tableofcontents.html)

// Import board model from [board.js](../documentation/board.html)
var Board = require('../../db/board');

// **boardUrl:** *String* <br>
// **board:** *Mongoose board model* <br>
// **io:** *Export of our Socket.io connection from [server.js](../documentation/server.html)*
var connect = function(boardUrl, board, io) {
  // Set the Socket.io namespace to the boardUrl.
  var whiteboard = io.of(boardUrl);
  console.log('socket triggered on get board');
  // console.log(boardUrl, board, io);

  whiteboard.on('connection', function(socket) {
    // Send the current state of the board to the client immediately on joining.

    console.log('imcoming socket from: '+socket.id);

    socket.emit('join', board);

    //if there is only one person on the socket, emit a message to tell them they are the dj
    console.log('ppl in room: '+socket.conn.server.clientsCount);
    // if(Number(socket.conn.server.clientsCount) === 1) {
    //   socket.emit('you_are_the_master', null);
    // }

    socket.on('start', function(pen) {

      // **A stroke is essentially a continous line drawn by the user.**
      socket.stroke = {
        pen: pen,
        path: []
      };
    });

    socket.on('drag', function(coords) {
      //Push coordinates into the stroke's drawing path.
      socket.stroke.path.push(coords);
      // This payload will be sent back to all sockets *except the socket
      // that initiated the draw event.*
      var payload = {
        pen: socket.stroke.pen,
        coords: coords
      };

      //Broadcast new line coords to everyone but the person who drew it.
      socket.broadcast.emit('drag', payload);
    });

    //When stroke is finished, add it to our db.
    socket.on('end', function() {
      var finishedStroke = socket.stroke;

      //Get the board that the socket is connected to.
      var id = socket.nsp.name.slice(1);

      //Update the board with the new stroke.
      Board.boardModel.update({_id: id},{$push: {strokes: finishedStroke} },{upsert:true},function(err, board){
        if(err){ console.log(err); }
        else {
          console.log("Successfully added");
        }
      });

      // Emit end event to everyone but the person who stopped drawing.
      socket.broadcast.emit('end', null);

      //Delete the stroke object to make room for the next stroke.
      delete socket.stroke;
    });

    // socket.on('music_play_all', function(data) {
    //   console.log('someone REALLY loves this shit');
    //   socket.emit('music_play', data);
    // });

    // socket.on('music_play', function(data) {
    //   console.log('someone loves this shit');
    //   socket.broadcast.emit('music_play', data);
    // });

    // socket.on('music_pause', function(data) {
    //   console.log('somone HATES this shit');
    //   socket.broadcast.emit('music_pause', data);
    // });

    // socket.on('music_request_status', function() {
    //   console.log('some noob just got to the room');
    //   socket.broadcast.emit('music_request_status', null);
    // });

    // socket.on('music_status', function(data) {
    //   console.log('i know whats happening in this room');
    //   socket.broadcast.emit('music_status', data);
    // });
    
  });
};

// Required by [server.js](../documentation/server.html)
module.exports = connect;
