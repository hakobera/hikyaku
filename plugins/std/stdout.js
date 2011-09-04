exports.exec = function(config, data, callback) {
  console.log(data);
  callback(null, data);
};