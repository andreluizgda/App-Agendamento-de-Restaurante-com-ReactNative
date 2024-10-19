const express = require('express');
const router = express.Router();
const Busboy = require('busboy'); // Certifique-se de que esta linha está correta
const aws = require('../services/aws');
const Arquivo = require('../models/arquivo');
const Servico = require('../models/servico');

router.post('/', (req, res) => {
    let busboy = new Busboy({ headers: req.headers }); // Corrigido para headers (plural)
    busboy.on('finish', async () => {
        try {
            const { restauranteID, servico } = req.body;
            let errors = [];
            let arquivos = [];

            if (req.files && Object.keys(req.files).length > 0) { // Corrigido para .length
                for (let key of Object.keys(req.files)) {
                    const file = req.files[key];

                    const nameParts = file.name.split('.'); // Corrigido para split
                    const fileName = `${new Date().getTime()}.${nameParts[nameParts.length - 1]}`;

                    const path = `servicos/${restauranteID}/${fileName}`;

                    const response = await aws.uploadToS3(file, path);

                    if (response.error) {
                        errors.push({ error: true, message: response.message.message });
                    } else {
                        arquivos.push(path);
                    }
                }
            }

            if (errors.length > 0) {
                res.json(errors[0]);
                return false;
            }

            // Criar serviço
            let jsonServico = JSON.parse(servico);
            const servicoCadastrado = await Servico(jsonServico).save();

            // Criar arquivo
            arquivos = arquivos.map(arquivo => ({
                referenciaID: servicoCadastrado._id,
                model: 'Servico',
                caminho: arquivo,
            }));

            await Arquivo.insertMany(arquivos);

            res.json({ servico: servicoCadastrado, arquivos });
        } catch (err) {
            res.status(400).json({ error: true, message: err.message });
        }
    });
    req.pipe(busboy); // Certifique-se de que esta linha esteja presente
});

module.exports = router;
