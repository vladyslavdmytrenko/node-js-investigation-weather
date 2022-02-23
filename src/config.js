const dotenv = require('dotenv').config();

module.exports = {
    PORT: dotenv.parsed.PORT || 4000,
    WEATHER_API_KEY: dotenv.parsed.WEATHER_API_KEY || '',
    MAP_BOX_API_KEY: dotenv.parsed.MAP_BOX_API_KEY || 4000,
}