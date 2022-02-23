const dotenv = require('dotenv').config();

module.exports = {
    PORT: dotenv.parsed.PORT || process.env.port,
    WEATHER_API_KEY: dotenv.parsed.WEATHER_API_KEY,
    MAP_BOX_API_KEY: dotenv.parsed.MAP_BOX_API_KEY,
}