const { users } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({ where: { email, password } });
    if (!user) {
      return res.status(404).json({ message: 'Your email is not registered' });
    } else {
      const token = jwt.sign({ uuid: user.uuid }, process.env.SECRET, {
        expiresIn: '3h',
      });
      return res.status(200).json({ message: 'Login success!', token });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
