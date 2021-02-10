const { users } = require('../../models');

module.exports = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await users.findOne({ where: { uuid } });
    await user.destroy();
    return res.status(200).json({ message: 'Guest logged out' });
  } catch (err) {
    return res.status(500).json(err);
  }
};
