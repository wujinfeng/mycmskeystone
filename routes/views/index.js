var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.data = {
		imgs: [],
		latestPosts: [],
	};
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	
	// banner 图片
	view.on('init', function (next) {
		var q= keystone.list('Gallery').model.find({'type':'banner'}).sort('-publishedDate');
		q.exec(function (err, results) {
			locals.data.imgs = results;
			next(err);
		});
	});

	// Load other latest new posts
	view.on('init', function (next) {
		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author categories').limit(6);
		q.exec(function (err, results) {
			locals.data.latestPosts = results;
			next(err);
		});
	});
	
	// Render the view
	view.render('index');
};
