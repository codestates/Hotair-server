const { chats } = require('../../models');
const { users } = require('../../models');
const { channels } = require('../../models');

module.exports = async (req, res) => {
  try {
    const channelName = req.params.channelName;
    const channel = await channels.findOne({ where: { channelName } });
    const chatList = await chats.findAll({
      where: { channelId: channel.id },
      include: users,
    });
    await chatList.user.password.delete();
    return res.status(200).json(chatList);
  } catch (err) {
    return res.status(500).json(err);
  }
};
