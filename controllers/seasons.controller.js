const Season = require('../models/Season.model');

module.exports.getAll = async(req, res, next) => {
  try {
    const seasons = await Season.find();
    res.status(200).json(seasons);
  } catch (err) {
    next(err);
  }
};

module.exports.getById = async(req, res, next) => {
  try {
    const season = await Season
      .findById(req.params.seasonId)
      .populate('clubs')
      .populate('matches');
    
    season = getStats(season);
    res.status(200).json(season);
  } catch (err) {
    next(err);
  }
};

const getStats = (season) => {
  const { clubs, matches } = season;
  const fullClubs = clubs.map(club => {
    let goals = 0;
    let fouls = 0;
    let yellowCards = 0;
    let redCards = 0;
    let blueCards = 0;
    for (let match in matches) {
      let side;
      switch (club.id) {
        case match.local.club:
          side = match.local
          break;
        case match.foreign.club:
          side = match.foreign
          break;
        default:
          continue;
      }

      goals += side.goals.length;
      fouls += side.fouls.length;

      for (let card in side.cards) {
        switch (card.color) {
          case 'Amarilla':
            yellowCards++
            break;
          case 'Roja':
            redCards++
            break;
          case 'Azul':
            blueCards++
            break;
        }
      }
    }

    return {
      ...club,
      goals,
      fouls,
      yellowCards,
      redCards,
      blueCards
    };
  });

  return { ...season, clubs: fullClubs };
};