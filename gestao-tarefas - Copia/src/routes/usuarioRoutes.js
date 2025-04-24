const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para registrar novo usuário
router.post('/usuarios', usuarioController.registrar);

// Rota para login de usuário
router.post('/login', usuarioController.login);

module.exports = router;
