const Season = require('../models/Season.model');
const Club = require('../models/Club.model')
const Match = require('../models/Match.model')

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
    const season = await Season.findById(req.params.seasonId);
    const matches = await Match.find({ season: season.id });
    const clubs = await Club.find();
    
    const data = getStats(clubs, matches);
    season = { ...season, data };
    
    res.status(200).json(season);
  } catch (err) {
    next(err);
  }
};

module.exports.getMainSeason = async(req, res, next) => {
  try {
    let season = await Season.findOne();
    const matches = await Match.find({ season: season.id });
    const clubs = await Club.find();
    
    const data = getStats(clubs, matches);
    season = { ...season, data };
    
    res.status(200).json(season);
  } catch (err) {
    next(err);
  }
};

const getStats = (clubs, matches) => {
  const fullClubs = clubs.map(club => {
    let goals = 0;
    let fouls = 0;
    let yellowCards = 0;
    let redCards = 0;
    let blueCards = 0;

    for (let i = 0; i < matches.length; i++){
      let match = matches[i];
      let side;

      if (club.id == match.local.club) side = match.local
      else if (club.id == match.foreign.club) side = match.foreign
      else continue

      goals += side.goals.length;
      fouls += side.fouls.length;

      for (let i = 0; i < side.cards.length; i++) {
        let card = side.cards[i];

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

  return fullClubs;
};