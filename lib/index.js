const { join } = require('path');
const mqtt = require('mqtt');

const { readValues } = require('./readvalues');

const config = require('loke-config').create('envirophatmqtt', { appPath: join(__dirname, '/../') });

let mqttClient;
let mqttConnected = false;
let interval;

const logger = console;
const mqttUri = 'mqtt://' + config.get('mqtt.host');
const topic = config.get('mqtt.topic');

exports.start = () => {
  mqttClient  = mqtt.connect(mqttUri);

  mqttClient.on('connect', function () {
    logger.info('MQTT connected');
    mqttConnected = true;
  });

  mqttClient.on('close', console.log);
  mqttClient.on('offline', console.log);
  // mqttClient.on('error', console.error);
  // mqttClient.on('message', console.log);
  
  // mqttClient.on('message', function (topic, message) {
  //   // message is Buffer 
  //   console.log(message.toString())
  // })

  const run = () => {
    readValues()
    .then(emit)
    .catch(err => console.error(err.stack));
  };

  interval = setInterval(run, 60000);
  run();
};

exports.stop = () => {
  clearInterval(interval);
};

function emit(valueMap) {
  console.log('emitting', valueMap);
  if (!mqttConnected) return;

  const data = Object.assign({}, valueMap, { timestamp: new Date() });
  mqttClient.publish(topic, JSON.stringify(data));
  logger.info(`Publish: ${topic} ${JSON.stringify(data)}`);
}
