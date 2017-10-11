var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	label:'文章文类',
	autokey: { from: 'name', path: 'key', unique: true },
});

PostCategory.add({
	name: { type: String, required: true },
});

PostCategory.relationship({ ref: 'Post', path: 'posts', refPath: 'categories' });

PostCategory.register();
