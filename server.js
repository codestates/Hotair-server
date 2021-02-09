const express = require('express');
require('dotenv').config();

const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const router = require('./routes.js');
const { sequelize } = require('./models');
const cookieParser = require('cookie-parser');
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('', router);

server.listen(port, async () => {
  console.log(`Listening on port:${port}`);
  await sequelize.sync();
  console.log('DB connected');
});

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  },
});

module.exports = io;
