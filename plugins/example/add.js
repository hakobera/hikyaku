exports.exec = function(config, data, callback) {
  var v = config.value;
  var sum = parseFloat(data);
  if (isNaN(sum)) {
    sum = 0;
  }
  sum += parseFloat(v);

  console.debug('sum = %s', sum);
  
  callback(null, sum);
};