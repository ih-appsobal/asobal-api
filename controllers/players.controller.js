const Player = require('../models/Player.model');

module.exports.getAll = async(req, res, next) => {
  try {
    const players = await Player.find()
      .populate('club');
    res.status(200).json(players);
  } catch (err) {
    next(err)
  }
};

module.exports.getById = async(req, res, next) => {
  try {
    const player = await Player
      .findById(req.params.playerId)
      .populate('club');
    res.status(200).json(player);
  } catch (err) {
    next(err)
  }
};