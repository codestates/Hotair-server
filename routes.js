const mainController = require('./controllers');
const router = require('express').Router();
const auth = require('./middlewares/auth');

//signup component에서 회원가입 컨트롤러 users/signup.js
// req.body = username, email, password, phone
router.post('/users/signup', mainController.signup);

// Login component에서 록인을 하기 위한 컨트롤러 users/login.js
// req.body = email, password
// res = message, token
router.post('/users/login', mainController.login);

// Guest login
router.post('/users/guestLogin', mainController.guestLogin);

// Guest logout
router.delete('/users/guestLogout/:uuid', mainController.guestLogout);

//App component에서 모든 유저 정보 불러오기 컨트롤러 users/getOtherUsersInfo.js
// res = 모든 유저 정보 (id, password 제외)
router.get('/users/:channelName', auth, mainController.getOtherUsersInfo);

//Mypage component에서 로그인된 회원정보 불러오기 컨트롤러 users/getUserInfo.js
// path = 유저의 uuid
// res = 로그인된 유저 정보 (id, password 제외)
router.get('/users/myinfo/:uuid', auth, mainController.getUserInfo);

//Chats component에서 chat 보내기 chats/sendChat.js
// req.headers = token, req.body = text, uuid
// res = username, avatar, text(socket.io), time
router.post('/chats/sendChat', auth, mainController.sendChat);

//Chats component에서 해당 channel의 모든 chat 가져오기 chats/getChats.js
// path = :channelId
// res = 모든 chat 정보
router.get('/chats/:channelName', auth, mainController.getChats);

//Mypage component에서 회원탈퇴 컨트롤러 users/deleteUser.js
//path = :uuid
// res = delete
router.delete('/users/delete/:uuid', auth, mainController.deleteUser);

//Mypage component에서 유저 정보 변경 컨트롤러 users/updateUserInfo.js
// path = :uuid
// req = username, email, password, phone, avatar
router.put('/users/updateUserInfo/:uuid', auth, mainController.updateUserInfo);

//Chat component에서 채팅 좋아요 컨트롤러 likes/clickLike.js
// req = chatId, uuid
// res = users' count
router.post('/likes/clickLike', auth, mainController.clickLike);

//App component에서 채널 추가 컨트롤러 channels/addChannel.js
// req.body = channelName
// res = message
router.post('/channels/addChannel', auth, mainController.addChannel);

// App component에서 모든채널 가져오기 컨트롤러 channels/getChannels.js
// req = Authorization
// res = channel list
router.get('/channels', auth, mainController.getChannels);

// ----------------------
// 깃허브 로그인
// post: client에서 포스트 요청으로 보낸 authorization code가 req
router.post('/github/login/callback', mainController.githubLoginCallback);

module.exports = router;
