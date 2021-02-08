const { io } = require('./server');
const { users, chats } = require('./controllers');
io.on('connection', (socket) => {
  console.log('Connected: ' + socket.username);

  socket.on('disconnect', () => {
    console.log('Disconnected: ' + socket.username);
  });

  socket.on('joinChannel', ({ channelName }) => {
    socket.join(channelName);
    console.log(`A user joined channelName: ${channelName}`);
  });

  socket.on('leaveChannel', ({ channelName }) => {
    socket.leave(channelName);
    console.log(`A user left channelName: ${channelName}`);
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
