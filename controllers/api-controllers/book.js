"use strict";

/**
 * Module dependencies.
 */

var Book  = require('../../models').Book;

var bookController = {
	index: function(req, res, next) {
    Book.findAll().then(function(books) {
			if (! books) {
        return res.status(404).json({
          message: "Book doesn't exist."
        });
			}
      return res.json(books);
    })
		.catch(function(err) {
			return next(err);
		});
	},

	show: function(req, res, next) {
		var id = req.params.id;

		Book.find({
		  where: {
		    id: id
		  }
		}).then(function(book) {
		  if (! book) {
				return res.status(404).json({
					message: "Book doesn't exist."
				});
		  }
		  return res.json(book);
		});
	},

	store: function(req, res, next) {
		var title = req.body.title;
		var description = req.body.description;

		// var inputs = {
		// 	title: req.body.title,
		// 	description: req.body.description
		// };

		Book.create({
			title: req.body.title,
			description: req.body.description
		}).then(function(book) {
			return res.json(book);
		}).catch(function(err) {
			return next(err);
		});
	},

	bulkStore: function(req, res, next) {
		// Array object of books to add
		var books = req.body.books;

		Book.bulkCreate(books).then(function(booksAdded) {
			return res.json(booksAdded);
		}).catch(function(err) {
			return next(err);
		});	 
	},

	update: function(req, res, next) {
		var id = req.params.id;

		var title = req.body.title;
		var description = req.body.description;

		Book.find({
		  where: {
		    id: id
		  }
		}).then(function(book) {
		  if (! book) {
				return res.status(404).json({
					message: "Book doesn't exist."
				});
		  }

			book
			  .updateAttributes({
			    title: title,
			    description: description
			  })
			  .then(function(updatedBook) {
			    return res.json(updatedBook);
			  })
			  .catch(function(err) {
			    return next(err);
			  });	  
		});
	},

	bulkUpdate: function(req, res, next) {
		// Array of ids to update
		var ids = req.body.ids;
		var title = req.body.title;
		var description = req.body.description;

		Book.update(
		  {
		    title: title,
		    description: description
		  },
		  {
		    where: {
		      id: ids
		    }
		  }
		).then(function() {
		  Book.findAll({where: {id: ids}}).then(function(updatedBooks) {
		    return res.json(updatedBooks);
		  });
		}).catch(function(err) {
		  return next(err);
		});
	},

	destroy: function(req, res, next) {
    var id = req.params.id;

    Book.find({
      where: {
        id: id
      }
    }).then(function(book) {
      if (! book) {
				return res.status(404).json({
					message: "Book doesn't exist."
				});
		  }

      book.destroy().then(function() {
        return res.status(204).json();
      });
    });
	},

	bulkDestroy: function(req, res, next) {
		// Array of ids to delete
		var ids = req.body.ids;

		Book.destroy({
		  where: {
		    id: ids
		  }
		}).then(function() {
		  return res.status(204).json();
		});
	}
};

module.exports = bookController;
