const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restauranteColaborador =  new Schema({
    restauranteID :{
        type: mongoose.Types.ObjectId,
        ref: 'Restaurante',
        required: true
    },
    colaboradorID :{
        type: mongoose.Types.ObjectId,
        ref: 'Colaborador',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['A', 'I'],
        default: 'A',
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('RestauranteColaborador', restauranteColaborador);