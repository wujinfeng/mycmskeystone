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
	detail: { type: String, label:'描述' },
	publishedDate: { type: Date, label:'创建日期', default: Date.now, format:'YYYY-MM-DD HH:mm:ss',  hidden:true },
	//heroImage: { type: Types.File,label:'主图片', storage: myStorage },
	type: { type: Types.Select,label:'类型',  options: [
		{ value: 'banner', label: '首页banner' },
		{ value: 'food', label: '美食展示' },
		{ value: 'staff', label: '职员' },
	] },
	images: { type: Types.File,label:'图片', storage: myStorage },
});

Gallery.register();
