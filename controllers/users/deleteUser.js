const { users } = require('../../models');

module.exports = async (req, res) => {
  const uuid = req.body.uuid;
  try {
    const user = await users.findOne({ where: { uuid } });
    await user.destroy();
    return res.json({ message: 'Unregistered successfully' });
  } catch (err) {
    return res.status(500).json(err);
  }
};
