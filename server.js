const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const { Notify } = require('./models/notify');
const _ = require('lodash');

// DB logic
mongoose
  .connect(
    'mongodb://localhost/notify',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to MongoDB...'));

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Hard coded results :)
const response = ['id', 'message', 'notified', 'currentLocation', 'fireLocation', 'wind'];
const currentLocation = { lng: 30.9835094, lat: 30.0112731 };
const fireLocation = { lng: 30.9922762, lat: 30.0149917 };

// Get all notifications
app.get('/api/notify/all', async (req, res) => {
  const notifications = await Notify.find().sort({ date: -1 });
  const result = notifications.map(n => _.pick(n, response));
  res.json(result);
});

// Get unnotified notifications
app.get('/api/notify', async (req, res) => {
  const notifications = await Notify.find().sort({ date: -1 });
  const unNotified = notifications.filter(n => n.notified === false);
  const result = unNotified.map(n => _.pick(n, response));
  res.json(result);
});

// Creat notification
app.post('/api/notify', async (req, res) => {
  const messages = [
    'Go away from here',
    'Fire is comming in the way!',
    'There is a fire near you, move to safer place',
    'You are in danger, get away from here'
  ];

  const APPID = '3e1dc0df5fe69819671e0de7fd8ad6cf';
  const LAT = fireLocation.lat;
  const LON = fireLocation.lng;
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&APPID=${APPID}`;

  const api = await fetch(URL);
  const json = await api.json();
  const wind = json.wind;

  const notification = new Notify({
    message: messages[Math.round(Math.random() * (messages.length - 1))],
    notified: false,
    currentLocation,
    fireLocation,
    wind
  });
  await notification.save();
  res.json(_.pick(notification, response));
});

// Change notified to true
app.put('/api/notify/:id', async (req, res) => {
  const notification = await Notify.findOne({ _id: req.params.id });
  notification.notified = true;
  await notification.save();
  res.json(_.pick(notification, response));
});

// Delete notification, PS: Not really needed
app.delete('/api/notify/:id', async (req, res) => {
  const notification = await Notify.findOne({ _id: req.params.id });
  await Notify.deleteOne({ _id: req.params.id });
  res.json(_.pick(notification, response));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listining on port ${port}`));
