const { constants } = require('./index');

module.exports = {
    PORT: process.env.PORT || constants.PORT,
    DB_CONNECT_URL: process.env.DB_CONNECT_URL
};