const PythonShell = require('python-shell');
const pi = require('node-raspi');
const MA = require('moving-average');

const config = require('./config');
const timeInterval = 5 * 60 * 1000; // 5 minutes

const ma = MA(timeInterval);

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
  console.log(sensorTemp, cpuTemp);
  const calibrated = sensorTemp - ((cpuTemp - sensorTemp) / factor);

  ma.push(Date.now(), calibrated);
  console.log('moving average now is', ma.movingAverage());
  console.log('moving variance now is', ma.variance());

  return calibrated;
}
