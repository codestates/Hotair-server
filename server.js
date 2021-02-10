const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');
const router = require('./routes.js');
const { sequelize } = require('./models');
const { chats, users, channels, usersChannelsJoin } = require('./models');
const cookieParser = require('cookie-parser');
const port = 4000;

sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('', router);

const server = app.listen(port, async () => {
  console.log(`Listening on port:${port}`);
  console.log('DB connected');
});

const jwt = require('jsonwebtoken');

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  },
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const userInfo = await jwt.verify(token, process.env.SECRET);
    console.log(userInfo);
    socket.uuid = userInfo.uuid;
    next();
  } catch (err) {
    console.log(err);
  }
});

io.on('connection', async (socket) => {
  const user = await users.findOne({ where: { uuid: socket.uuid } });
  console.log('Connected: ' + user.username);

  socket.on('disconnect', async () => {
    console.log('Disconnected: ' + user.username);
    const userChannel = await usersChannelsJoin.findOne({
      where: {
        userId: user.id,
      },
    });
    await userChannel.destroy();
  });

  socket.on('joinChannel', async ({ channelName }) => {
    socket.join(channelName);
    console.log(`${user.username} joined channel : ${channelName}`);
    const channel = await channels.findOne({ where: { channelName } });
    await usersChannelsJoin.create({ userId: user.id, channelId: channel.id });
  });

  socket.on('leaveChannel', async ({ channelName }) => {
    socket.leave(channelName);
    console.log(`${user.username} left channel : ${channelName}`);
    const channel = await channels.findOne({ where: { channelName } });
    const userChannel = await usersChannelsJoin.findOne({
      where: {
        userId: user.id,
        channelId: channel.id,
      },
    });
    await userChannel.destroy();
  });

  socket.on('channelChat', async ({ channelName, text }) => {
    if (text.trim().length > 0) {
      const channel = await channels.findOne({ where: { channelName } });
      await chats.create({ userId: user.id, channelId: channel.id, text });
      io.to(channelName).emit('newText', {
        text,
        username: user.username,
        uuid: user.uuid,
      });
    }
  });
});
