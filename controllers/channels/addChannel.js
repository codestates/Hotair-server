const { channels } = require('../../models');

module.exports = async (req, res) => {
  const { channelName } = req.body;
  try {
    const overlapName = await channels.findOne({ where: { channelName } });
    if (overlapName) {
      return res.json({ message: 'Channel name already exists' });
    }
    await channels.create({ channelName: channelName });
    const channel = await channels.findOne({ where: { channelName } });
    return res.status(200).json({ channel });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
