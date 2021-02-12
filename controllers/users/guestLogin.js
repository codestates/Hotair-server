const { users } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  try {
    let number = getRandomInt(99);
    await users.create({
      username: 'guest',
      email: `guest${number}@guest.com`,
      password: 'guest123',
      phone: '010-1234-1234',
      isUser: false,
    });
    const user = await users.findOne({ where: { username: 'guest' } });
    const guestNumber = await user.uuid.slice(0, 4);
    user.username = `guest_${guestNumber}`;
    await user.save();
    const token = await jwt.sign({ uuid: user.uuid }, process.env.SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token, message: 'You logged in as guest' });
  } catch (err) {
    return res.json(err);
  }
};
