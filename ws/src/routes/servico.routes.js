const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const aws = require('../services/aws');
const Arquivo = require('../models/arquivo');
const Servico = require('../models/servico');

router.post('/', async (req, res) => {
    let busboy = new Busboy({ headers: req.headers }); 
    let arquivos = [];
    let errors = [];

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const nameParts = filename.split('.');
        const fileName = `${new Date().getTime()}.${nameParts[nameParts.length - 1]}`;
        const path = `servicos/${req.body.restauranteID}/${fileName}`;

        // Upload do arquivo para o S3
        aws.uploadToS3(file, path).then(response => {
            if (response.error) {
                errors.push({ error: true, message: response.message });
            } else {
                arquivos.push(path);
            }
        });
    });

    busboy.on('finish', async () => {
        try {
            const { restauranteID, servico } = req.body; 

            // Espera que todos os uploads sejam concluídos
            if (errors.length > 0) {
                return res.status(400).json(errors[0]);
            }

            // Criar Serviço
            let jsonServico;
            try {
                jsonServico = JSON.parse(servico);
            } catch (e) {
                return res.status(400).json({ error: true, message: "Formato inválido para 'servico'" });
            }

            const servicoCadastrado = await new Servico(jsonServico).save();  // Instancia e salva o serviço

            // Criar Arquivo
            const arquivosData = arquivos.map(caminho => ({
                referencia: servicoCadastrado._id,
                model: 'Servico',
                caminho: caminho,
            }));
            
            await Arquivo.insertMany(arquivosData);  // Correção no método

            res.json({ servico: servicoCadastrado, arquivos: arquivosData });

        } catch (err) {
            res.status(500).json({ error: true, message: err.message });
        }
    });

    req.pipe(busboy);
});

module.exports = router;
