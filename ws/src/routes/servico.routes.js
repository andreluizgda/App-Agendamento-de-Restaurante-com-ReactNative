const express = require('express');
const router = express.Router();
const Restaurante = require('../models/restaurante');
const Servico = require('../models/servico');

router.post('/', async (req, res) => {
    try{
       
    } catch (err){
        res.json({ error: true, message: err.message });
    }
});

module.exports = router;
