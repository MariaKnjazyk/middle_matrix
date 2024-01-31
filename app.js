const express = require('express');
const mongoose = require('mongoose');
const routes = require('./api.routes');

require('dotenv').config();

const { DB_CONNECT_URL, PORT } = require('./configs/configs');

const app = express();

mongoose.connect(DB_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);
app.use(_mainErrorHandler);

(async function () {
    try {
        await mongoose.connect(DB_CONNECT_URL);

        app.listen(PORT, () => {
            console.log('App listen', PORT);
        });
    } catch (e) {
        console.log(e);
    }
})();

function _mainErrorHandler(err, req, res, next) {
    res.status(err.status || 500).json({ message: err.message || 'Unknown error' });
}