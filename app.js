// app.js

const express = require('express');
const router = require('./router/route');
const { errorHandler } = require('./helper/errorHandler');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use(errorHandler)

module.exports = app;
