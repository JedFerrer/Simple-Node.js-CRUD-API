/**
 * Module dependencies.
 */

var commentController = {
	index: function(req, res, next) {
    res.render('index', { title: 'Express' });
	}
};

module.exports = commentController;
