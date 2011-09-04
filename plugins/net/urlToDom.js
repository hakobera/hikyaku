var jsdom = require('jsdom');

var JQUERY_URL = 'http://code.jquery.com/jquery-1.6.2.min.js';

exports.exec = function(config, data, callback) {
  var url = config.url;

  var scripts = [];
  scripts.push(JQUERY_URL);

  console.log('Scraping from %s start', url);

  jsdom.env(url, scripts, function(err, window) {
    if (err) {
      callback(err);
      return;
    }

    console.log('Scraping from %s success', url);

    callback(null, window);
  });

};