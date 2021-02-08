const { channels } = require('../../models');

module.exports = async (req, res) => {
  const { channelName } = req.body;
  try {
    await channels.create({ channelName: channelName });
    return res.status(200).json({ channelName });
  } catch (err) {
    console.log(err);
  }
};
