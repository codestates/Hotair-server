module.exports = {
  login: require('./users/login'),
  logout: require('./users/logout'),
  signup: require('./users/signup'),
  deleteUser: require('./users/deleteUser'),
  getOtherUsersInfo: require('./users/getOtherUsersInfo'),
  getUserInfo: require('./users/getUserInfo'),
  updateUserInfo: require('./users/updateUserInfo'),
  getChats: require('./chats/getChats'),
  sendChat: require('./chats/sendChat'),
  clickLike: require('./likes/clickLike'),
  addChannel: require('./channels/addChannel'),
};
