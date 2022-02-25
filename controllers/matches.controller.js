const Match = require('../models/Match.model');

module.exports.getAll = async(req, res, next) => {
  try {
    const matches = Match.find();
    res.status(200).json(matches);
  } catch (err) {
    next(err)
  }
};

module.exports.getById = async(req, res, next) => {
  try {
    const match = Match.findById(req.params.matchId);
    res.status(200).json(match);
  } catch (err) {
    next(err)
  }
};