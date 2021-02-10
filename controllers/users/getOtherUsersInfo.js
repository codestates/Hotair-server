const { users } = require('../../models');

module.exports = async (req, res) => {
  try {
    const allUsers = await users.findAll();
    return res.status(200).json(allUsers);
  } catch (err) {
    return res.status(500).json(err);
  }
};
