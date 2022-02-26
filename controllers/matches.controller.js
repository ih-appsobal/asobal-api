const Match = require('../models/Match.model');

module.exports.getAll = async(req, res, next) => {
  try {
    const matches = await Match.find()
      .populate({
        path: 'local',
        populate: {
          path: 'club'
        }
      })
      .populate({
        path: 'foreign',
        populate: {
          path: 'club'
        }
      });
    res.status(200).json(matches);
  } catch (err) {
    next(err)
  }
};

module.exports.getById = async(req, res, next) => {
  try {
    const match = await Match
      .findById(req.params.matchId)
      .populate({
        path: 'local',
        populate: {
          path: 'club'
        }
      })
      .populate({
        path: 'foreign',
        populate: {
          path: 'club'
        }
      })
      .populate('season')
      .populate('stories')
    res.status(200).json(match);
  } catch (err) {
    next(err)
  }
};

module.exports.getByFixture = async (req, res, next) => {
  try {
    const matches = await Match.find({fixture: req.params.fixture})
      .populate({
        path: 'local',
        populate: {
          path: 'club'
        }
      })
      .populate({
        path: 'foreign',
        populate: {
          path: 'club'
        }
      });
    res.status(200).json(matches);
  } catch (err) {
    next(err);
  }
}