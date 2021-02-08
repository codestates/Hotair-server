const { channels } = require('../../models');

module.exports = async (req, res) => {
  const { channelName } = req.body;
  try {
    const overlapName = await channels.findOne({ where: { channelName } });
    if (overlapName) {
      return res.json({ message: 'Channel name already exists' });
    }
    await channels.create({ channelName: channelName });
    return res.status(200).json({ channelName });
  } catch (err) {
    return res.status(500).json(err);
  }
};
