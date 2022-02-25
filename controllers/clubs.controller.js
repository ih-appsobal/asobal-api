const Club = require('../models/Club.model');

module.exports.getAll = async(req, res, next) => {
  try {
    const clubs = Club.find();
    res.status(200).json(clubs);
  } catch (err) {
    next(err);
  }
};

module.exports.getById = async(req, res, next) => {
  try {
    const club = Club.findById(req.params.clubId);
    res.status(200).json(club);
  } catch (err) {
    next(err);
  }
};