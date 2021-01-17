// app.js
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
const root = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/', root);
module.exports = app;
