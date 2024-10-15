const express = require('express');
const router = express.Router();
const Restaurante = require('../models/restaurante');
const Servico = require('../models/servico');

// Rota para criar um novo restaurante
router.post('/', async (req, res) => {
    try {
        const restaurante = await new Restaurante(req.body).save();
        res.status(201).json(restaurante); // Adiciona status 201 (Created)
    } catch (err) {
        res.status(400).json({ error: true, message: err.message }); // Status 400 em caso de erro
    }
});

// Rota para obter os serviços ativos de um restaurante
router.get('/servicos/:restauranteID', async (req, res) => {
    try {
        const { restauranteID } = req.params;
        const servicos = await Servico.find({
            restauranteID,
            status: 'A'
        }).select('_id titulo');

        // Retorna os serviços em um formato label-value
        res.json({
            servicos: servicos.map(s => ({ label: s.titulo, value: s._id }))
        });
    } catch (err) {
        res.status(400).json({ error: true, message: err.message });
    }
});

module.exports = router;
