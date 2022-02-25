const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goals = [{
  type: Number,
  required: [true, 'El minuto es requerido']
}];

const cards = [{
  color: {
    type: String,
    enum: ['Amarilla', 'Roja', 'Azul'],
    required: true
  },
  minute: {
    type: Number,
    required: [true, 'El minuto es requerido']
  }
}];

const fouls = [{
  type: Number,
  required: [true, 'El minuto es requerido']
}];

const matchSchema = new Schema({
  fixture: {
    type: Number,
    required: [true, 'La fixture es requerida']
  },
  date: {
    type: Date,
    required: [true, 'La fecha es requerida']
  },
  result: {
    type: String,
    enum: ['1', 'X', '2']
  },
  status: {
    type: String,
    enum: ['No comenzado', 'En vivo', 'Primera parte', 'Descanso', 'Segunda parte', 'Terminado'],
    default: 'No comenzado'
  },
  local: {
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
      required: [true, 'El equipo local es requerido']
    },
    goals: goals,
    cards: cards,
    fouls: fouls
  },
  foreign: {
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
      required: [true, 'El equipo visitante es requerido']
    },
    goals: goals,
    cards: cards,
    fouls: fouls
  },
  minute: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Season',
    required: [true, 'La temporada es obligatoria']
  }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;