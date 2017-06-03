const PythonShell = require('python-shell');

const options = {};
const scriptPath = 'lib/script.py';

exports.readValues = () => {
  return new Promise((resolve, reject) => {
    console.log(scriptPath);
    PythonShell.run(scriptPath, options, function (err, results) {
      if (err) return reject(err);

      // results is an array consisting of messages collected during execution
      const result = results[0]; // should only be 1
      resolve(JSON.parse(result));
    });
  });
};
