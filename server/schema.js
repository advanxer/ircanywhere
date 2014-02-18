/**
 * IRCAnywhere server/schema.js
 *
 * @title IRCAnywhere Daemon
 * @copyright (c) 2013-2014 http://ircanywhere.com
 * @license GPL v2
 * @author Ricki Hastings
*/

exports.schema = {
	'mongo': {
		type: 'string',
		required: true
	},
	'oplog': {
		type: 'string',
		required: true
	},
	'url': {
		type: 'string',
		required: true
	},
	'port': {
		type: 'number',
		required: true
	},
	'reverseDns': {
		type: 'string',
		required: true
	},
	'enableRegistrations': {
		type: 'boolean',
		required: true
	},
	'forkProcess': {
		type: 'boolean',
		required: true
	},
	'email': {
		type: 'object',
		required: true
	},
	'email.siteName': {
		type: 'string',
		required: false
	},
	'email.from': {
		type: 'string',
		required: true
	},
	'email.smtp': {
		type: 'string',
		required: true
	},
	'clientSettings': {
		type: 'object',
		required: true
	},
	'clientSettings.activityTimeout': {
		type: 'number',
		required: true
	},
	'clientSettings.networkLimit': {
		type: 'number',
		min: 0,
		max: 10,
		required: true
	},
	'clientSettings.networkRestriction': {
		type: 'string',
		required: false
	},
	'clientSettings.userNamePrefix': {
		type: 'string',
		required: true
	},
	'defaultNetwork': {
		type: 'object',
		required: true
	},
	'defaultNetwork.server': {
		type: 'string',
		required: true
	},
	'defaultNetwork.port': {
		type: 'number',
		min: 1,
		max: 65535,
		required: true
	},
	'defaultNetwork.realname': {
		type: 'string',
		required: true
	},
	'defaultNetwork.secure': {
		type: 'boolean',
		required: false
	},
	'defaultNetwork.password': {
		type: 'string',
		required: false
	},
	'defaultNetwork.channels': {
		type: 'array',
		required: false
	},
	'defaultNetwork.channels.$.channel': {
		type: 'string',
		required: true,
		regEx: /([#&][^\x07\x2C\s]{0,200})/
	},
	'defaultNetwork.channels.$.password': {
		type: 'string',
		required: false
	}
};