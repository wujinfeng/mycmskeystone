var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User',{
	label:'用户',
});

User.add({
	name: { type: Types.Name, label:'名称', required: true, index: true },
	email: { type: Types.Email, label:'邮件', initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, label:'密码', initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: '管理员?', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
