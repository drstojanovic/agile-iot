const express = require('express')
const app = express()

const mqtt = require('mqtt'), 
    url = require('url');

const auth = ['pedjauser', 'pedjauser']
const mqtt_url = 'mqtt://m21.cloudmqtt.com';

const options = {
  port: 16747,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: auth[0],
  password: auth[1],
};

const cities = ['London', 'Paris', 'Moscow', 'Berlin', 'Nis'];

let temperatures = cities.reduce(function (data, city, index) {
  data[city] = {};
  data[city].id = index + 1;
  data[city].name = city;
  data[city].values = [];
  return data;
}, {});

// Create a client connection
const client = mqtt.connect(mqtt_url, options);

client.on('connect', function() {
  client.subscribe('TemperatureMQTT', function() {
    client.on('message', function(topic, message, packet) {
      const { city, temperature } = JSON.parse(message);
      temperatures[city].values = [...temperatures[city].values, temperature];      
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });
});

app.get('/', function (req, res) {
  res.send(temperatures)
});

app.get('/api/city/:cityId', function (req, res) {
  const name = cities[req.params.cityId - 1];
  const city = temperatures[name];

  res.json(city);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});