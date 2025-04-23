const Tarefa = require('../models/tarefa');

const tarefaController = {
  // GET /api/tarefas
  listarTodas: async (req, res) => {
    const usuarioId = req.usuario.id;

    try {
      const tarefas = await Tarefa.buscarTodas(usuarioId);
      res.json(tarefas);
    } catch (erro) {
      console.error('Erro ao listar tarefas:', erro);
      res.status(500).json({ erro: 'Erro ao buscar tarefas.' });
    }
  },

  // GET /api/tarefas/:id
  listarPorId: async (req, res) => {
    const { id } = req.params;
    const usuarioId = req.usuario.id;

    try {
      const tarefa = await Tarefa.buscarPorId(id, usuarioId);
      if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada.' });
      }
      res.json(tarefa);
    } catch (erro) {
      console.error('Erro ao buscar tarefa por ID:', erro);
      res.status(500).json({ erro: 'Erro ao buscar tarefa.' });
    }
  },

  // POST /api/tarefas
  criar: async (req, res) => {
    const { titulo, descricao } = req.body;
    const usuarioId = req.usuario.id;

    try {
      const novaTarefa = await Tarefa.criar(titulo, descricao, usuarioId);
      res.status(201).json(novaTarefa);
    } catch (erro) {
      console.error('Erro ao criar tarefa:', erro);
      res.status(500).json({ erro: 'Erro ao criar tarefa.' });
    }
  },

  // PUT /api/tarefas/:id
  atualizar: async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, concluida } = req.body;
    const usuarioId = req.usuario.id;

    try {
      const tarefaAtualizada = await Tarefa.atualizar(
        id,
        titulo,
        descricao,
        concluida,
        usuarioId
      );

      if (!tarefaAtualizada) {
        return res.status(404).json({ erro: 'Tarefa não encontrada ou sem permissão.' });
      }

      res.json(tarefaAtualizada);
    } catch (erro) {
      console.error('Erro ao atualizar tarefa:', erro);
      res.status(500).json({ erro: 'Erro ao atualizar tarefa.' });
    }
  },

  // DELETE /api/tarefas/:id
  excluir: async (req, res) => {
    const { id } = req.params;
    const usuarioId = req.usuario.id;

    try {
      await Tarefa.excluir(id, usuarioId);
      res.status(204).send();
    } catch (erro) {
      console.error('Erro ao excluir tarefa:', erro);
      res.status(500).json({ erro: 'Erro ao excluir tarefa.' });
    }
  }
};

module.exports = tarefaController;
