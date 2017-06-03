var PythonShell = require('python-shell');
var options = {};

exports.readValues = () => {
  return new Promise((resolve, reject) => {
    PythonShell.run('script.py', options, function (err, results) {
      if (err) return reject(err);

      // results is an array consisting of messages collected during execution
      const result = results[0]; // should only be 1
      resolve(JSON.parse(result));
    });
  });
};
