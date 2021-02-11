const { chats } = require('../../models');
const { users } = require('../../models');

module.exports = async (req, res) => {
  try {
    const channelName = req.params.channelName;
    const chatList = await chats.findAll({
      where: { channelName: channelName },
      include: users,
    });
    await chatList.user.password.delete();
    return res.status(200).json(chatList);
  } catch (err) {
    return res.status(500).json(err);
  }
};
