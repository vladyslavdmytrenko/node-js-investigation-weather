const express = require('express');
const app = express();
const path = require('path');
const publicUrl = path.join(__dirname, '../public');
const pathToPartials = path.join(__dirname, '../templates/partials');
const pathToView = path.join(__dirname, '../templates/views');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { PORT } = require('./config');

// Define path for express config
app.set('view engine', 'hbs');
app.set('views', pathToView);
hbs.registerPartials(pathToPartials);

// Setup static directory to serve
app.use(express.static(publicUrl));

app.get('', (req, res) => {
  res.render('index', {
    title: 'This is a title',
    name: 'name',
  });
});

app.get('/weather_info', (req, res) => {
  res.render('weather_info');
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMsg: 'Not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`);
});
