const { usersChannelsJoin } = require('../../models');
const { channels } = require('../../models');
const { users } = require('../../models');

module.exports = async (req, res) => {
  const channelName = req.params.channelName;
  try {
    // 해당 채널이름의 채널 정보 가져오기
    const channel = await channels.findOne({ where: { channelName } });
    // 해당 채널에 있는 사람들의 정보 가져오기
    const channelInUsers = await usersChannelsJoin.findAll({
      include: users,
      where: { channelId: channel.id },
    });
    // 사람들의 정보들중에서 이름만 추출하기
    const nameList = channelInUsers.map((el) => el.users[0].username);
    return res.status(200).json({ nameList });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// const chatList = await chats.findAll({
//   where: { channelId: channelId },
//   include: users,
// });
