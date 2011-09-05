/**
 * Module dependencies.
 */
var path = require('path')
	, fs = require('fs')
	, async = require('async')
	, log4js = require('log4js');

/**
 * Tool version.
 */
exports.version = '0.0.1';

/**
 * Global exception handler.
 */
process.on('uncaughtException', function(err) {
	abort(err);
});

// Logger
var log = log4js.getLogger('hikyaku')
  , clog = log4js.getLogger('console');

/**
 * Hikyaku runner
 * @class
 */
var Runner = function(options) {
  this.config = options.config;
  this.plugindir = options.plugindir;

  if (options.debug) {
    log.setLevel('DEBUG');
    clog.setLevel('DEBUG');
  } else {
    log.setLevel('INFO');
    clog.setLevel('INFO');
  }

  log.info('configfile: %s', this.config);
  log.info('plugindir: %s', this.plugindir);

  this.configPath = path.join(process.cwd(), this.config.substring(0, this.config.lastIndexOf('.')));
};

/**
 * Read config file and execute it.
 * @public
 */
Runner.prototype.run = function() {
  var conf = require(this.configPath)
    , moduleDefs = conf.modules
    , plugindir = this.plugindir;

  log.debug("modules = ", moduleDefs);

  async.reduce(moduleDefs, {}, function(data, moduleDef, callback) {
    var moduleName = moduleDef.module,
        module, modulePath;

    if (!moduleName || moduleName.length === 0) {
      abort('Module name is required');
    }

    modulePath = getModulePath(plugindir, moduleDef);
    if (!path.existsSync(modulePath + '.js')) {
      abort(modulePath + ' not found');
    }

    log.debug('Module %s found at %s', moduleName, modulePath);
    try {
      module = require(modulePath);
      log.info('Execute %s start', moduleName);
      module.exec(moduleDef.config, data, callback);
    } catch (e) {
      abort(e);
    }
  }, function(err, result) {
    if (err) {
      abort(err);
    }
  });
};

/**
 * Runner factory method.
 */
exports.createRunner = function(options) {
  var runner = new Runner(options);
  return runner;
};

/**
 * Parse module name, and convert it to module path.
 *
 * @param {Object} moduleDef
 * @return {String} module path
 * @private
 */
function getModulePath(plugindir, moduleDef) {
	if (plugindir.substring(0, 1) !== '/') {
		plugindir = path.join(process.cwd(), plugindir);
	}
	var modulePath = moduleDef.module.replace('.', '/');
	return path.join(plugindir, modulePath);
}

/**
 * Exit with the given message.
 *
 * @param {String} message
 * @private
 */
function abort(message) {
	console.error(message);
	console.error('aborted');
	process.exit(1);
}


