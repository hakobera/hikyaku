/**
 * JSON style configuration file loader
 */
var fs = require('fs');

exports.exec = function(config, data, callback) {
  var filename = config.filename;

  var txt = fs.readFileSync(filename);
  var obj = JSON.parse(txt);

  console.debug(obj);

  callback(null, obj);
};