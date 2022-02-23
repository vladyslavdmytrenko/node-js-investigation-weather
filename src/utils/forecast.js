const request = require('request');
const { WEATHER_API_KEY } = require('../config');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ' It is currently ' +
          body.current.temperature +
          ' degress out. There is a ' +
          body.current.precipProbability +
          '% chance of rain.'
      );
    }
  });
};

module.exports = forecast;
