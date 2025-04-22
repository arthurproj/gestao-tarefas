const Tarefa = require('../models/Tarefa');

const tarefaController = {
  listarTodas: async (req, res) => {
    try {
      const tarefas = await Tarefa.buscarTodas();
      res.json(tarefas);
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao buscar tarefas.' });
    }
  },

  listarPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const tarefa = await Tarefa.buscarPorId(id);

      if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada.' });
      }

      res.json(tarefa);
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao buscar tarefa.' });
    }
  },

  criar: async (req, res) => {
    try {
      const { titulo, descricao } = req.body;
      const novaTarefa = await Tarefa.criar(titulo, descricao);
      res.status(201).json(novaTarefa);
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao criar tarefa.' });
    }
  },

  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descricao, concluida } = req.body;

      const tarefaAtualizada = await Tarefa.atualizar(id, titulo, descricao, concluida);

      res.json(tarefaAtualizada);
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao atualizar tarefa.' });
    }
  },

  excluir: async (req, res) => {
    try {
      const { id } = req.params;

      await Tarefa.excluir(id);

      res.status(204).send(); // sem conteúdo
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao excluir tarefa.' });
    }
  }
};

module.exports = tarefaController;
