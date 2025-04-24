const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para registrar novo usuário
router.post('/usuarios', usuarioController.registrar);

// Rota para login de usuário
router.post('/login', usuarioController.login);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Operações relacionadas ao usuário (registro, login)
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     tags: [Usuários]
 *     summary: Registrar um novo usuário
 *     description: Registra um novo usuário no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao.silva@gmail.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: "João Silva"
 *                 email:
 *                   type: string
 *                   example: "joao.silva@gmail.com"
 *       400:
 *         description: Usuário já cadastrado
 *       500:
 *         description: Erro ao registrar usuário
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Usuários]
 *     summary: Realizar login de um usuário
 *     description: Realiza o login do usuário e retorna um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao.silva@gmail.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso, retorna o token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "jwt_token_aqui"
 *                 nome:
 *                   type: string
 *                   example: "João Silva"
 *       400:
 *         description: Email e senha são obrigatórios
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro no login
 */
