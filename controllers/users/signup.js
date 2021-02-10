const { users } = require('../../models');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const { username, email, password, phone } = req.body;
  try {
    let alreadyUser = await users.findOne({
      where: { [Op.or]: [{ email: email }, { username: username }] },
    });
    if (alreadyUser) {
      return res
        .status(409)
        .json({ message: 'User with username or email is already registered' });
    } else {
      const user = await users.create({
        username,
        email,
        password,
        phone,
      });
      return res
        .status(201)
        .json({ message: `Signed up successfully with ${user.email}` });
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
              'Please enter a password of more than 8 characters including number',
          });
        }
        if (err.errors[0].path === 'phone') {
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
