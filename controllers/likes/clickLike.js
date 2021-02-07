const { users } = require('../../models');
const { likes } = require('../../models');
const { usersLikesJoin } = require('../../models');

module.exports = async (req, res) => {
  // const { chatId, uuid } = req.body;
  // try {
  //   const user = await users.findOne({ where: { uuid: uuid } });
  //   if (!(await likes.findOne({ where: { userId:user.id, chatId: chatId } }))) {
  //     await likes.create({ chatId: chatId });
  //   }
  //   const likeCount = await likes.count({ where: { chatId: chatId } });

  //   return res.status(200).json({ likeCount });

  const { chatId, uuid } = req.body;
  try {
    // const user = await users.findOne({ where: { uuid } });
    // await likes.create({ chatId: chatId });
    // const like = await likes.findOne;
    const likeCount = await likes.count({ where: { chatId: chatId } });
    return res.status(200).json({ likeCount });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
