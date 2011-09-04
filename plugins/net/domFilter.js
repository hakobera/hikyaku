var async = require('async');

exports.exec = function(config, data, callback) {
  var $ = data.$
    , selector = config.selector
    , mapCallback = config.callback;

  console.debug('selector = %s', selector);
  console.debug('callback = %s', mapCallback);

  var items  = $(selector).toArray();

  if (mapCallback) {
    var fn = eval('var f = function(it) { var item = $(it); ' + mapCallback + ' }; f;');
    async.map(items, function(item, next) {
      try {
        var v = fn(item);
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