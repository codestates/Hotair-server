const { chats } = require('../../models');
const { users } = require('../../models');

module.exports = async (req, res) => {
  const { uuid, text, channelId } = req.body;
  try {
    const user = await users.findOne({ where: { uuid: uuid } });
    const chat = await chats.create({
      text: text,
      userId: user.id,
      channelId: channelId,
    });

    return res.status(200).json({
      text: chat.text,
      username: user.username,
      avatar: user.avatar,
      time: chat.createdAt,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
