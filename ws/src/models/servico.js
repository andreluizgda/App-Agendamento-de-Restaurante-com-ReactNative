const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servico =  new Schema({
    restauranteID :{
        type: mongoose.Types.ObjectId,
        ref: 'Restaurante',
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    duracao: {
        type: Number, // Em minutos do Serviço
        required: true
    },
    comissao: {
        type: Number, // % de Comissão de Preço
        required: true
    },
    recorrencia: {
        type: Number, // Periodo de Recorrencia do Serviço em Dias
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['A', 'I', 'E'],
        default: 'A',
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Servico', servico);