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
