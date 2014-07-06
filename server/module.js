/**
 * IRCAnywhere server/modules.js
 *
 * @title ModuleManager
 * @copyright (c) 2013-2014 http://ircanywhere.com
 * @license GPL v2
 * @author Rodrigo Silveira
 */

var _ = require('lodash'),
	fs = require('fs'),
	Q = require('q');

/**
 * Handles loading of modules.
 *
 * @class ModuleManager
 * @method ModuleManager
 * @return void
 */
function ModuleManager() {
	var self = this;

	self.modules = {};

	application.ee.on('ready', self.loadAllModules.bind(self));
}

/**
 * Loads a module by name. The name should be the name of the folder containing the module.
 *
 * @method loadModule
 * @param {String} moduleName Name of module to load.
 * @return void
 */
ModuleManager.prototype.loadModule = function(moduleName) {
	var self = this,
		modulePath = 'modules/' + moduleName + '/server';

	application.logger.log('info', 'Loading server module ' + moduleName);
	self.modules[moduleName] = {
		name: moduleName,
		loaded: false,
		object: null
	};
	// create a local object

	loadMod(moduleName, modulePath)
		.fail(function(e) {
			return loadMod(moduleName, modulePath + '/main');
		})
		.fail(function(e) {
			application.logger.log('error', 'Failed to load module ' + moduleName);
			application.handleError(e);
		});

	function loadMod(name, path) {
		var deferred = Q.defer();

		try {
			self.modules[name].object = require('../' + path);
			self.modules[name].loaded = true;
			application.logger.log('info', 'Server module ' + moduleName + ' loaded');
			deferred.resolve();
		} catch (e) {
			deferred.reject(e);
		}

		return deferred.promise;
	}
};

/**
 * Loads all modules.
 *
 * @method loadAllModules
 * @return void
 */
ModuleManager.prototype.loadAllModules = function() {
	var self = this,
		readdir = Q.denodeify(fs.readdir),
		stat = Q.denodeify(fs.stat);

	readdir('modules')
		.then(function (files) {
			return Q.all(files.map(function (file) {
				return stat('modules/' + file)
					.then(function (stats) {
						stats.fileName = file;
						return stats;
					});
				// get stats for every file in modules to look for directories
			}));
		})
		.then(function (fileStats) {
			fileStats.forEach(function (file) {
				if (file.isDirectory()) {
					self.loadModule(file.fileName);
				}
			});
		})
		.fail(function (error) {
			application.logger.log('error', 'Failed to load modules');
			application.handleError(new Error(error));
		});
};

exports.ModuleManager = ModuleManager;
