var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'gallery';
    //console.log(keystone.list('Gallery').model.find().sort('sortOrder'));
	// Load the galleries by sortOrder
	view.query('galleries', keystone.list('Gallery').model.find({'type':'food'}).sort('sortOrder'));

	// Render the view
	view.render('gallery');

};
