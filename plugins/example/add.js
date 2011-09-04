exports.exec = function(context, data, callback) {
  var v = context.config.value;
  var sum = parseFloat(data);
  if (isNaN(sum)) {
    sum = 0;
  }
  sum += parseFloat(v);

  context.log.info('sum = %s', sum);
  
  callback(null, sum);
};