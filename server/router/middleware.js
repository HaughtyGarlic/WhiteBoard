var morgan = require('morgan');
var bodyParser = require('body-parser')

module.exports = function (app, express, io) {

  var documentationRouter = express.Router();
  var boardRouter = express.Router();
  var newBoardRouter = express.Router();
  var activeBoardRouter = express.Router();

  app.use(morgan('dev'));

  app.use('/', express.static(__dirname + '/../../public'));

  app.use('/documentation', express.static(__dirname + '/../../docs'));
  
  app.use('/documentation', documentationRouter);

  app.use('/new', bodyParser.json(), newBoardRouter);

  app.use('/active', activeBoardRouter);

  app.use('/room', boardRouter);

  // app.all('*', boardRouter)

  require('../documentation/documentationRouter.js')(documentationRouter);
  require('../board/newBoardRouter.js')(newBoardRouter);
  require('../board/activeBoardRouter.js')(activeBoardRouter);
  require('../board/boardRouter.js')(boardRouter, io);

};