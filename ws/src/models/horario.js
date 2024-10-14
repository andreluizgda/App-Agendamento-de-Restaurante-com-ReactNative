const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const horario =  new Schema({
    restauranteID :{
        type: mongoose.Types.ObjectId,
        ref: 'Restaurante',
        required: true
    },
    servicoID :[
        {
        type: mongoose.Types.ObjectId,
        ref: 'Servico',
        required: true
        },
    ],
    colaboradorID :[
        {
        type: mongoose.Types.ObjectId,
        ref: 'Colaborador',
        required: true
        },
    ],
    dias: {
        type: [Number],
        required: true
    },
    inicio: {
        type: Date,
        required: true
    },
    fim: {
        type: Date,
        required: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Horario', horario);