const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arquivo =  new Schema({
    referenciaID: {
        type: Schema.Types.ObjectId,
        refPath: 'model'
    },
    model:{
        type: String,
        require: true,
        enum: ['Servico', 'Restaurante']
    },
    caminho: {
        type: String,
        require: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Arquivo', arquivo);