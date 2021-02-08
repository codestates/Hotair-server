const { channels } = require('../../models');

module.exports = async (req, res) => {
  const channelList = await channels.findAll();
  try {
    return res.status(200).json(channelList);
  } catch (err) {
    return res.status(500).json(err);
  }
};
