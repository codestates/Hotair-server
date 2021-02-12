require('dotenv').config();

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const axios = require('axios');

const { users } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  callback: async (req, res) => {
    console.log(req.body);
    axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token`,
      headers: {
        accept: 'application/json',
      },
      data: {
        client_id: clientID,
        client_secret: clientSecret,
        code: req.body.authorizationCode,
      },
    })
      .then(async (res) => {
        const accessToken = res.data.access_token;
        let response = await axios.get('https://api.github.com/user', {
          headers: {
            authorization: `token ${accessToken}`,
          },
        });
        return response;
      })
      .then(async (res2) => {
        const { id, login } = res2.data;
        await users.create({
          email: `${login}@git.com`,
          password: `git${id}`,
          username: login,
        });
        const findUser = await users.findOne({
          where: { email: `${login}@git.com` },
        });
        const token = await jwt.sign(
          { uuid: findUser.uuid },
          process.env.SECRET,
          { expiresIn: '3h' },
        );
        console.log(token);
        return res.status(200).json({ token });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
