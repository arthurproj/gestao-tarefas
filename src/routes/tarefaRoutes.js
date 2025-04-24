const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const autenticarToken = require('../middlewares/authMiddleware');

router.get('/tarefas', autenticarToken, tarefaController.listarTodas);
router.get('/tarefas/:id', autenticarToken, tarefaController.listarPorId);
router.post('/tarefas', autenticarToken, tarefaController.criar);
router.put('/tarefas/:id', autenticarToken, tarefaController.atualizar);
router.delete('/tarefas/:id', autenticarToken, tarefaController.excluir);
router.patch('/tarefas/:id/concluir', autenticarToken, tarefaController.concluir);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Tarefas
 *   description: Operações relacionadas às tarefas de um usuário (listar, criar, atualizar, excluir, concluir)
 */

/**
 * @swagger
 * /tarefas:
 *   get:
 *     tags: [Tarefas]
 *     summary: Listar todas as tarefas de um usuário
 *     description: Retorna todas as tarefas de um usuário autenticado.
 *     responses:
 *       200:
 *         description: Lista de tarefas do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     example: "Tarefa 1"
 *                   descricao:
 *                     type: string
 *                     example: "Descrição da tarefa"
 *                   concluida:
 *                     type: boolean
 *                     example: false
 *       401:
 *         description: Não autorizado. Token inválido ou não fornecido.
 *       500:
 *         description: Erro ao listar tarefas.
 */

/**
 * @swagger
 * /tarefas/{id}:
 *   get:
 *     tags: [Tarefas]
 *     summary: Buscar tarefa por ID
 *     description: Retorna a tarefa de um usuário pelo ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da tarefa a ser buscada.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: "Tarefa 1"
 *                 descricao:
 *                   type: string
 *                   example: "Descrição da tarefa"
 *                 concluida:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Tarefa não encontrada.
 *       401:
 *         description: Não autorizado. Token inválido ou não fornecido.
 *       500:
 *         description: Erro ao buscar tarefa.
 */

/**
 * @swagger
 * /tarefas:
 *   post:
 *     tags: [Tarefas]
 *     summary: Criar uma nova tarefa
 *     description: Cria uma nova tarefa para o usuário autenticado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Nova Tarefa"
 *               descricao:
 *                 type: string
 *                 example: "Descrição da nova tarefa"
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: "Nova Tarefa"
 *                 descricao:
 *                   type: string
 *                   example: "Descrição da nova tarefa"
 *       401:
 *         description: Não autorizado. Token inválido ou não fornecido.
 *       500:
 *         description: Erro ao criar tarefa.
 */

/**
 * @swagger
 * /tarefas/{id}:
 *   put:
 *     tags: [Tarefas]
 *     summary: Atualizar tarefa existente
 *     description: Atualiza os dados de uma tarefa específica.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da tarefa a ser atualizada.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Tarefa Atualizada"
 *               descricao:
 *                 type: string
 *                 example: "Descrição atualizada"
 *               concluida:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: "Tarefa Atualizada"
 *                 descricao:
 *                   type: string
 *                   example: "Descrição atualizada"
 *                 concluida:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Tarefa não encontrada
 *       401:
 *         description: Não autorizado. Token inválido ou não fornecido.
 *       500:
 *         description: Erro ao atualizar tarefa.
 */

/**
 * @swagger
 * /tarefas/{id}:
 *   delete:
 *     tags: [Tarefas]
 *     summary: Excluir tarefa
 *     description: Exclui uma tarefa específica do usuário.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da tarefa a ser excluída.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Tarefa excluída com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *       401:
 *         description: Não autorizado. Token inválido ou não fornecido.
 *       500:
 *         description: Erro ao excluir tarefa.
 */

/**
 * @swagger
 * /tarefas/{id}/concluir:
 *   patch:
 *     tags: [Tarefas]
 *     summary: Concluir uma tarefa
 *     description: Marca uma tarefa como concluída.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da tarefa a ser concluída.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Tarefa concluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: "Tarefa Concluída"
 *                 descricao:
 *                   type: string
 *                   example: "Descrição da tarefa concluída"
 *                 concluida:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Tarefa não encontrada
 *       401:
 *         description: Não autorizado. Token inválido ou não fornecido.
 *       500:
 *         description: Erro ao concluir tarefa.
 */
