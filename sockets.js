import { io } from './server.js';
const jwt = require('jsonwebtoken');
const { chats, users } = require('./models');

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

io.on('connection', (socket) => {
  console.log('Connected: ' + socket.username);

  socket.on('disconnect', () => {
    console.log('Disconnected: ' + socket.username);
  });

  socket.on('joinChannel', ({ channelName }) => {
    socket.join(channelName);
    console.log(`A user joined channel : ${channelName}`);
  });

  socket.on('leaveChannel', ({ channelName }) => {
    socket.leave(channelName);
    console.log(`A user left channel : ${channelName}`);
  });

  socket.on('channelMessage', async ({ channelName, message }) => {
    if (message.trim().length > 0) {
      const user = await users.findOne({
        where: { username: socket.username },
      });
      const chat = await chats.create({});
      io.to(channelName).emit('newMessage', {
        message,
        username: socket.username,
      });
    }
  });
});
