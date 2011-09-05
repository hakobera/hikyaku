var async = require('async');

exports.exec = function(config, data, callback) {
  var $ = data.$
    , selector = config.selector
    , mapCallback = config.callback;

  console.debug('selector = %s', selector);
  console.debug('callback = %s', mapCallback);

  var items  = $(selector).toArray();

  if (mapCallback) {
    async.map(items, function(item, next) {
      try {
        var v = mapCallback($(item));
        next(null, v);
      } catch (e) {
        next(e);
      }
    },
    function(err, result) {
      err ? callback(err) : callback(null, result);
    });
  } else {
    callback(null, items);
  }
};