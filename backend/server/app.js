const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const webRoutes = require('../routes/webRoutes');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use('/api', webRoutes);

module.exports = app;