const { chats } = require('../../models');
const { users } = require('../../models');

module.exports = async (req, res) => {
  // token 인증 후 :
  try {
    const channelId = req.params.channelId;
    const chatList = await chats.findAll({
      where: { channelId: channelId },
      include: users,
    });
    return res.status(200).json(chatList);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
