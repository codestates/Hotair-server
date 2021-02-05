const { users } = require('../../models');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const uuid = req.params.uuid;
  const { username, email, password, phone, avatar } = req.body;
  try {
    let alreadyUser = await users.findOne({
      where: { [Op.or]: [{ email: email }, { username: username }] },
    });
    if (alreadyUser) {
      return res
        .status(409)
        .json({ message: 'User with username or email already exists' });
    } else {
      const user = await users.findOne({ where: { uuid } });

      user.username = username;
      user.email = email;
      user.password = password;
      user.phone = phone;
      user.avatar = avatar;

      await user.save();

      return res.json(user);
    }
  } catch (err) {
    switch (err.errors[0].validatorKey) {
      case 'notEmpty':
        res.status(400).json({ message: 'Please fill all the information' });
        break;
      case 'notNull':
        res.status(400).json({ message: 'Please fill all the information' });
        break;
      case 'isEmail':
        res.status(400).json({ message: 'Please enter a valid email' });
        break;
      case 'is':
        if (err.errors[0].path === 'password') {
          res.status(400).json({
            message:
              'Please enter a password of more than 8 characters including numbers',
          });
        } else if (err.errors[0].path === 'phone') {
          res
            .status(400)
            .json({ message: 'Please enter a valid phone number' });
        }
        break;
      default:
        return res.status(500).json(err);
    }
  }
};
