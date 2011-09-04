var http = require('http')
  , URL = require('url')
  , fs = require('fs')
  , path = require('path')
  , async = require('async');

exports.exec = function(config, data, callback) {
  var url = config.url
    , outDir = path.resolve(config.dir)
    , urls = [];

  if (url) {
    urls.push(url);
  }

  if (Array.isArray(data)) {
    urls = urls.concat(data);
  } else {
    urls.push(data);
  }

  if (!path.existsSync(outDir)) {
    console.debug(outDir);
    fs.mkdirSync(outDir, '755');
  }

  console.debug(urls);

  async.forEachSeries(urls, function(url, next) {
    var u = URL.parse(url),
        options = {
          host: u.hostname,
          port: 80,
          path: u.pathname + '?' + u.query
        };

      console.debug(u, options);

      http.get(options, function(res) {
        var contentType = res.headers['content-type']
          , responseData = ''
          , ext = '.' + contentType.substring(contentType.lastIndexOf('/') + 1);

        res.setEncoding('binary');
        
        res.on('data', function(chunk) {
          responseData += chunk;
        });

        res.on('end', function() {
          var buf = new Buffer(responseData, 'binary'),
              outFile = path.join(outDir, u.pathname.replace(/\//g, '_') + ext);

          console.info('Save %s to %s', url, outFile);
          fs.writeFile(outFile, buf, function(err) {
            err ? next(err) : next();
          });
        })
      }).on('error', function(err) {
        next(err);
      });
  },
  function(err) {
    err ? callback(err) : callback(null, data);
  });
};