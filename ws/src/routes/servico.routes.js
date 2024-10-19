const express = require('express');
const multer = require('multer');
const router = express.Router();

// Configuração do multer para aceitar arquivos em memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rota para upload de arquivo
router.post('/', upload.fields([{ name: 'file' }, { name: 'jsonFile' }]), (req, res) => {
    console.log('Campos recebidos:', req.files);
    
    if (!req.files || !req.files.file || !req.files.jsonFile) {
        return res.status(400).send('É necessário enviar uma imagem e um arquivo JSON.');
    }

    const { file, jsonFile } = req.files;

    if (!file || !jsonFile) {
        return res.status(400).send('É necessário enviar uma imagem e um arquivo JSON.');
    }

    try {
        const { restauranteID } = req.body;
        console.log('restauranteID:', restauranteID);

        // Verifica se restauranteID está definido
        if (!restauranteID) {
            return res.status(400).send('restauranteID é obrigatório.');
        }

        // Lógica para processar o arquivo JSON
        const jsonData = JSON.parse(jsonFile[0].buffer.toString());
        console.log('Dados do JSON:', jsonData);

        // Lógica para processar o arquivo de imagem
        const imageName = `${Date.now()}-${file[0].originalname}`;
        const imagePath = `servicos/${restauranteID}/images/${imageName}`;
        console.log('Caminho da imagem:', imagePath);

        // Aqui você deve adicionar a lógica de upload para o S3 ou o que você estiver usando

        res.status(201).json({ message: 'Upload concluído!', filename: imageName, jsonData });
    } catch (err) {
        console.error('Erro ao processar a solicitação:', err);
        res.status(500).send('Erro ao processar a solicitação: ' + err.message);
    }
});


module.exports = router;
