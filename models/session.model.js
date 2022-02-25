const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SesionSchema = Schema({
    name: {
        type: String,
        require: [true, 'El nombre de la temporada es obligatorio']
    },
});

module.exports = mongoose.model('Sesason', SesionSchema);