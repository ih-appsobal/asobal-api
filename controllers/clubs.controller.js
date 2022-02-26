const Club = require('../models/Club.model');

module.exports.getAll = async(req, res, next) => {
  try {
    const clubs = await Club.find();
    res.status(200).json(clubs);
  } catch (err) {
    next(err);
  }
};

module.exports.getById = async(req, res, next) => {
  try {
    const club = await Club
      .findById(req.params.clubId)
      .populate('matches');
    
    club = getStats(club);
    
    res.status(200).json(club);
  } catch (err) {
    next(err);
  }
};

const getStats = (club) => {
    let goals = 0;
    let fouls = 0;
    let yellowCards = 0;
    let redCards = 0;
    let blueCards = 0;
    for (let match in club.matches) {
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
  }