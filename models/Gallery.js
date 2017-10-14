var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Gallery', {
	label:'图片',
	autokey: { from: 'name', path: 'key', unique: true },
});

var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: 'public/files',
		publicPath: '/files',
	},
});

Gallery.add({
	name: { type: String, label:'名称', required: true },
	publishedDate: { type: Date, label:'发布日期', default: Date.now },
	//heroImage: { type: Types.CloudinaryImage },
	//images: { type: Types.CloudinaryImages },
	images: { type: Types.File,label:'图片', storage: myStorage },
});

Gallery.register();
