var fs = require('fs');

exports.exec = function(config, data, callback) {
  var filename = config.filename
    , stream;

  console.debug('Load %s', filename);

  stream = fs.createReadStream(filename, { encoding: 'utf8' });

  console.debug(stream);

  callback(null, stream);
};