const PythonShell = require('python-shell');
const pi = require('node-raspi');

const config = require('./config');

const options = {};
const scriptPath = 'lib/script.py';

const factor = config.get('temperature.factor');

exports.readValues = () => {
  return new Promise((resolve, reject) => {
    PythonShell.run(scriptPath, options, function (err, results) {
      if (err) return reject(err);

      // results is an array consisting of messages collected during execution
      const result = results[0]; // should only be 1
      const data = JSON.parse(result);
      data.temperature = calibrateTemp(data.temperature, getCpuTemp(), factor);
      resolve(data);
    });
  });
};

function getCpuTemp() {
  return pi.getThrm();
}

function calibrateTemp(sensorTemp, cpuTemp, factor) {
  return sensorTemp - ((cpuTemp - sensorTemp) / factor);
}
