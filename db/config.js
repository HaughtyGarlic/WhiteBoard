// # MongoDB Database Configuration

// ##### [Back to Table of Contents](./tableofcontents.html)
var mongoose = require('mongoose');

//TODO: (99) Add in conditional statement for DEV or PROD
// Currently configured for deployment. Change to this for development:
// mongoose.connect('mongodb://127.0.0.1');
mongoose.connect('mongodb://coder:radio@ds031651.mongolab.com:31651/coderboard');
// mongoose.connect(process.env.MONGOLAB_URI);
if (process.env.NODE_ENV === 'DEV') {
  mongoose.connect('mongodb://127.0.0.1');
} else {
  mongoose.connect('mongodb://127.0.0.1');
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(cb) {
  console.log('connected to db');
});

// Required by [Mongoose Board Model](../documentation/board.html)
module.exports = db;
