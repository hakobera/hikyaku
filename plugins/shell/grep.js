exports.exec = function(config, data, callback) {
  var stream = data
    , pattern = new RegExp(config.pattern, 'g')
    , lines = [];

  stream.on('data', function(txt) {
    var l = txt.split('\n');
    lines = lines.concat(l);
  });

  stream.on('end', function() {
    var result = [];

    console.debug(pattern);
    console.debug(lines);

    lines.forEach(function(line) {
      console.debug(line);
      if (pattern.test(line)) {
        result.push(line);
      }
    });

    console.debug(result);
    callback(null, result);
  });
  
};