const { PORT } = require('./constants');
require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || PORT,
    DB_CONNECT_URL: process.env.DB_CONNECT_URL,
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY,
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY
};