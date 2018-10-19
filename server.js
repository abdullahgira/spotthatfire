const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Notify } = require('./models/notify');
const _ = require('lodash');


// DB logic
mongoose
.connect('mongodb://localhost/notify',{ useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB..."));


const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/api/notify', async (req, res) => {
  const notifications = await Notify.find().sort({ date: -1 });
  const result = notifications.map(n => _.pick(n, ['message', 'notified']));
  res.json(result);
});

app.post('/api/notify', async (req, res) => {
  const notification = new Notify({
    message: req.body.message,
    notified: false
  });
  await notification.save();
  res.json( _.pick(notification, ['message', 'notified']));
})

app.delete('/api/notify/:id', async (req, res) => {
  const notification = await Notify.findOne({ _id: req.params.id });
  // if (!user)
  //   return res
  //     .status(404)
  //     .json({ error: 'there is no user with this `username`', data: '' });

  await Notify.deleteOne({ username: req.params.username });
  res.json(_.pick(notification, ['message', 'notified']));
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listining on port ${port}`));