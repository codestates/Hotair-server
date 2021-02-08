const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');
const router = require('./routes.js');
const { sequelize } = require('./models');
const cookieParser = require('cookie-parser');
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('', router);

const server = app.listen(port, async () => {
  console.log(`Listening on port:${port}`);
  await sequelize.sync();
  console.log('DB connected');
});

const io = require('socket.io')(server);
const jwt = require('jsonwebtoken');

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const userInfo = await jwt.verify(token, process.env.SECRET);
    socket.username = userInfo.username;
    next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = io;
