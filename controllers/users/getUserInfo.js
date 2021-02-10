const { users } = require('../../models');

module.exports = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    //if (!token) {return res.status(401).json(message: 'Unauthorized')}
    const user = await users.findOne({ where: { uuid } });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};
