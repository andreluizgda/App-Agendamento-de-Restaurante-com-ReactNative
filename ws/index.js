const express = require('express');
const morgan = require('morgan');
require('./database'); // Certifique-se de que o arquivo de conexão com o MongoDB está correto

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json()); // Para analisar requisições JSON
app.use(express.urlencoded({ extended: true })); // Para analisar requisições URL-encoded

// VARIABLES
app.set('port', 8000);

//ROTAS
app.use('/restaurante',require('./src/routes/restaurante.routes'))

// INICIAR O SERVIDOR
app.listen(app.get('port'), () => {
    console.log(`WS Escutando na Porta ${app.get('port')}`);
});
