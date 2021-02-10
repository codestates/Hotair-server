const io = require('./server');
const jwt = require('jsonwebtoken');
const { chats, users, channels, usersChannelsJoin } = require('./models');
// const { Op } = require('sequelize');
require('dotenv').config();

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const userInfo = await jwt.verify(token, process.env.SECRET);
    console.log(userInfo);
    socket.username = userInfo.username;
    next();
  } catch (err) {
    console.log(err);
  }
});

io.on('connection', (socket) => {
  console.log('Connected: ' + socket.username);

  socket.on('disconnect', () => {
    console.log('Disconnected: ' + socket.username);
  });

  socket.on('joinChannel', async ({ channelName, username }) => {
    socket.join(channelName);
    console.log(`${username} joined channel : ${channelName}`);
    const channel = await channels.findOne({ where: { channelName } });
    const user = await users.findOne({ where: { username } });
    await usersChannelsJoin.create({ userId: user.id, channelId: channel.id });
  });

  socket.on('leaveChannel', async ({ channelName, username }) => {
    socket.leave(channelName);
    console.log(`${username} left channel : ${channelName}`);
    const channel = await channels.findOne({ where: { channelName } });
    const user = await users.findOne({ where: { username } });
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
      const user = await users.findOne({
        where: { username: socket.username },
      });
      const channel = await channels.findOne({ where: { channelName } });
      await chats.create({ userId: user.id, channelId: channel.id, text });
      io.to(channelName).emit('newText', {
        text,
        username: socket.username,
      });
    }
  });
});
