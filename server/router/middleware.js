var morgan = require('morgan');

module.exports = function (app, express, io) {

  var documentationRouter = express.Router();
  var boardRouter = express.Router();

  app.use(morgan('dev'));

  app.use('/', express.static(__dirname + '/../../public'));

  app.use('/documentation', express.static(__dirname + '/../../docs'));
  
  app.use('/documentation', documentationRouter);

  app.use('/new', boardRouter);

  app.use('/:boardId', boardRouter)

  require('../documentation/documentationRouter.js')(documentationRouter);
  require('../board/boardRouter.js')(boardRouter, io);

};