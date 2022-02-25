const Season = require('../models/Season.model');

module.exports.getAll = async(req, res, next) => {
  try {
    const seasons = Season.find();
    res.status(200).json(seasons);
  } catch (err) {
    next(err);
  }
};

module.exports.getById = async(req, res, next) => {
  try {
    const season = Season
      .findById(req.params.seasonId)
      .populate('clubs');
    
    res.status(200).json(season);
  } catch (err) {
    next(err);
  }
};