/**
 * Module dependencies.
 */

var indexController = require('./controllers/page-controllers/index');

var bookController = require('./controllers/api-controllers/book');

module.exports = function (app) {
  // page routes
  app.get('/', indexController.index);

  // api routes
  app.get('/api/books/', bookController.index);
  app.get('/api/books/:id', bookController.show);

  app.post('/api/books/', bookController.store);
  app.post('/api/books/bulk', bookController.bulkStore);

  app.put('/api/books/:id', bookController.update);
  app.put('/api/books/', bookController.bulkUpdate);

  app.delete('/api/books/:id', bookController.destroy);
  app.delete('/api/books/', bookController.bulkDestroy);

};
