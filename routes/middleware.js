/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
 { label: '首页', key: 'home', href: '/' },
 { label: '菜单', key: 'blog', href: '/blog' },
 { label: '图片', key: 'gallery', href: '/gallery' },
 { label: '联系我们', key: 'contact', href: '/contact' },
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: '首页', key: 'home', href: '/' },
		{ label: '美食', key: 'gallery', href: '/gallery' },
		{ label: '菜单', key: 'menu', href: '/menu' },
		{ label: '位置', key: 'location', href: '/location' },
		{ label: '职员', key: 'staff', href: '/staff' },
		{ label: '博客', key: 'blog', href: '/blog' },
		{ label: '联系我们', key: 'contact', href: '/contact' },
		{ label: '企业介绍', key: 'news', href: '/news' },
	];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
