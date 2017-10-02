const express = require('express')
const app = express();

const mqtt = require('mqtt'), 
    url = require('url');

const auth = ['pedjauser', 'pedjauser']
const mqtt_url = 'mqtt://m21.cloudmqtt.com';

const options = {
  port: 16747,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: auth[0],
  password: auth[1]
};

const cities = ['London', 'Paris', 'Moscow', 'Berlin', 'Nis'];

let temperatures = cities.reduce((data, city, index) => {
  data[city] = {};
  data[city].id = index + 1;
  data[city].name = city;
  data[city].values = [];
  return data;
}, {});

const client = mqtt.connect(mqtt_url, options);

client.on('connect', () => {
  client.subscribe('TemperatureMQTT', () => {
    client.on('message', (topic, message, packet) => {
      const { city, temperature } = JSON.parse(message);
      temperatures[city].values = [...temperatures[city].values, temperature];      
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req, res) => {
  res.send('API IS UP!');
});

app.get('/api/city/all', (req, res) => {
  const result = Object.values(temperatures).map((temp, i) => {
    const { id, name, values } = temp;
    return {
      averageTemperature: values.reduce((sum, value) => sum + value, 0) / values.length,
      currentTemperature: values[values.length - 1],
      historical: values.slice(Math.max(values.length - 10, 1)),
      id,
      name
    };
  });

  res.json(result);
});

getCityById = (id) => {
  const name = cities[id - 1];
  return temperatures[name];
}

app.get('/api/city/:cityId', (req, res) => {
  const city = getCityById(req.params.cityId);
  res.json(city);
});

app.get('/api/city/:cityId/historical', (req, res) => {
  const { values } = getCityById(req.params.cityId);
  const historical = values.slice(Math.max(arr.length - 10, 1))
  res.json(historical);
});

app.listen(3000, () => {
  console.log('API started on port 3000!')
});