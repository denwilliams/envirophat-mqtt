const config = require('loke-config').create('envirophatmqtt', { appPath: join(__dirname, '/../') });
const { join } = require('path');

let mqttClient;
let mqttConnected = false;

const logger = console;
const mqttUri = 'mqtt://' + config.get('mqtt.host');
const baseTopic = config.get('mqtt.base_topic');

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
};

exports.stop = () => {

};

function emit(topic, key, value) {
  if (!mqttConnected) return;
  mqttClient.publish(topic, JSON.stringify({ key: value, timestamp: new Date() }));
  logger.info('Publish: ' + topic);
}
