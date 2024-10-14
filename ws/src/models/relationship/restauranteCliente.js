const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restauranteCliente =  new Schema({
    restauranteID :{
        type: mongoose.Types.ObjectId,
        ref: 'Restaurante',
        required: true
    },
    clienteID :{
        type: mongoose.Types.ObjectId,
        ref: 'Cliente',
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

module.exports = mongoose.model('RestauranteCliente', restauranteCliente);