const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agendamento =  new Schema({
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
    servicoID :{
        type: mongoose.Types.ObjectId,
        ref: 'Servico',
        required: true
    },
    clienteID :{
        type: mongoose.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    data:{
        type: Date,
        required: true
    },
    comissao:{
        type: Number,
        required: true
    },
    valor:{
        type: Number,
        required: true
    },
    transactionID:{
        type: String,
        required: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Agendamento', agendamento);