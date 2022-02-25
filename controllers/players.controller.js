const Player = require('../models/Player.model');

module.exports.getAll = async(req, res, next) => {
  try {
    const players = Player.find();
    res.status(200).json(players);
  } catch (err) {
    next(err)
  }
};

module.exports.getById = async(req, res, next) => {
  try {
    const player = Player.findById(req.params.playerId);
    res.status(200).json(player);
  } catch (err) {
    next(err)
  }
};