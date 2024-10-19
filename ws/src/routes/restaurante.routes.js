const express = require('express');
const router = express.Router();
const Restaurante = require('../models/restaurante');
const Servico = require('../models/servico');

// Função de validação atualizada para verificar o campo 'endereco'
const validarDadosRestaurante = (dados) => {
    if (!dados.nome || !dados.endereco) {
        throw new Error('Nome e endereço são obrigatórios');
    }

    // Verifica se os detalhes da localização dentro de 'endereco' estão presentes
    const { cidade, uf, cep, numero, pais } = dados.endereco;
    if (!cidade || !uf || !cep || !numero || !pais) {
        throw new Error('Todos os campos de endereço são obrigatórios');
    }
};

router.post('/', async (req, res) => {
    try {
        // Valida os dados do restaurante
        validarDadosRestaurante(req.body);

        const restaurante = await new Restaurante(req.body).save();
        res.status(201).json({ restaurante });

    } catch (err) {
        res.status(400).json({ error: true, message: err.message });
    }
});

router.get('/servico/:restauranteID', async (req, res) => {
    try {
        const { restauranteID } = req.params;
        const servicos = await Servico.find({
            restauranteID,
            status: 'A'
        }).select('_id titulo');

        res.json({
            servicos: servicos.map(s => ({ label: s.titulo, value: s._id }))
        });
    } catch (err) {
        res.status(400).json({ error: true, message: err.message });
    }
});

module.exports = router;
