var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.data = {
		imgs: [],
	};
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'staff';
	// banner 图片
	view.on('init', function (next) {
		var q= keystone.list('Gallery').model.find({'type':'staff'}).sort('-publishedDate');
		q.exec(function (err, results) {
			locals.data.imgs = results;
			next(err);
		});
	});
	
	// Render the view
	view.render('staff');
};
