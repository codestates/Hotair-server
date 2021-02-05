const express = require('express');

const app = express();
const cors = require('cors');
const mainController = require('./controllers');
const { sequelize } = require('./models');
const cookieParser = require('cookie-parser');
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//signup component에서 회원가입 컨트롤러 users/signup.js
// req.body = username, email, password, phone
app.post('/users/signup', mainController.signup);

//App component에서 모든 유저 정보 불러오기 컨트롤러 users/getOtherUsersInfo.js
// res = 모든 유저 정보 (id, password 제외)
app.get('/users', mainController.getOtherUsersInfo);

//Mypage component에서 로그인된 회원정보 불러오기 컨트롤러 users/getUserInfo.js
// path = 유저의 uuid
// res = 로그인된 유저 정보 (id, password 제외)
app.get('/users/:uuid', mainController.getUserInfo);

//Chats component에서 chat 보내기 chats/sendChat.js
// req.headers = token, req.body = text, uuid
// res = username, avatar, text(socket.io), time
app.post('/chats/sendChat', mainController.sendChat);

//Chats component에서 해당 channel의 모든 chat 가져오기 chats/getChats.js
// path = :channelId
// res = 모든 chat 정보
app.get('/chats/:channelId', mainController.getChats);

//Mypage component에서 회원탈퇴 컨트롤러 users/deleteUser.js
//path = :uuid
// res = delete
app.delete('/users/delete/:uuid', mainController.deleteUser);

//Mypage component에서 유저 정보 변경 컨트롤러 users/updateUserInfo.js
// path = :uuid
// req = username, email, password, phone, avatar
app.put('/users/updateUserInfo/:uuid', mainController.updateUserInfo);

//Chat component에서 채팅 좋아요 컨트롤러 likes/clickLike.js
// req = chatId, uuid
// res = users' count
app.post('/likes/clickLike', mainController.clickLike);

app.listen(port, async () => {
  console.log(`Listening on port:${port}`);
  await sequelize.authenticate();
  console.log('DB connected');
});
