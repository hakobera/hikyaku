var fs = require('fs');

exports.exec = function(config, data, callback) {
  var filename = config.filename;

  var s = data.toString();
  if (Array.isArray(data)) {
    s = '';
    data.forEach(function(d) {
      s += d;
      s += '\n';
    });
  }

  console.debug(s);

  fs.writeFile(filename, s, function(err) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, data);
  });
};