var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	label:'文章',
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: 'data/files',
		publicPath: '/files',
	},
});

Post.add({
	title: { type: String, label:'标题',required: true },
	state: { type: Types.Select, label:'状态', options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, label:'作者', ref: 'User', index: true },
	publishedDate: { type: Types.Date, label:'发布日期', index: true, dependsOn: { state: 'published' } },
	image: { type: Types.File,label:'图片', storage: myStorage },
	content: {
		brief: { type: Types.Html, label:'简介', wysiwyg: true, height: 150 },
		extended: { type: Types.Html, label:'内容', wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, label:'分类',ref: 'PostCategory', many: true },
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
