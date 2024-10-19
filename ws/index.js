const express = require('express');
const busboy = require('connect-busboy');
const morgan = require('morgan');
require('./database'); // Certifique-se de que o arquivo de conexão com o MongoDB está correto

const app = express();

// MIDDLEWARES
app.use(morgan('dev')); // Para logar requisições
app.use(busboy()); // Middleware para o Busboy
app.use(express.json()); // Para analisar requisições JSON
app.use(express.urlencoded({ extended: true })); // Para analisar requisições URL-encoded

// VARIABLES
app.set('port', process.env.PORT || 8000); // Use variável de ambiente para a porta

// ROTAS
app.use('/restaurante', require('./src/routes/restaurante.routes'));
app.use('/servico', require('./src/routes/servico.routes'));

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!'); // Resposta genérica para erros
});

// INICIAR O SERVIDOR
app.listen(app.get('port'), () => {
    console.log(`WS Escutando na Porta ${app.get('port')}`);
});
