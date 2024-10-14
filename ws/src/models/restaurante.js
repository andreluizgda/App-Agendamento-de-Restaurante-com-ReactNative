const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurante =  new Schema({
    nome: {
        type: String,
        required: [true, 'Nome e Obrigatório! ']
    },
    foto: String,
    capa: String,
    email: {
        type: String,
        required: [true, 'E-Mail e Obrigatório! ']
    },
    senha: {
        type: String,
        default: null,
    },
    telefone: String,
    endereco: {
        cidade: String,
        uf: String,
        cep: String,
        numero: String,
        pais: String,
    },
    geo: {
        tipo:String,
        coordinates: Array,
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    },
});

restaurante.index({geo: '2dsphere'})

module.exports = mongoose.model('Restaurante', restaurante);