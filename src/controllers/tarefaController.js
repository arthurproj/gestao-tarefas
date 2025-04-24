const Tarefa = require('../models/Tarefa');

const tarefaController = {
  listarTodas: async (req, res) => {
    try {
      const usuarioId = req.usuario.id;
      const tarefas = await Tarefa.buscarTodas(usuarioId);
      res.json(tarefas);
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao buscar tarefas.' });
    }
  },

  listarPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioId = req.usuario.id;
      const tarefa = await Tarefa.buscarPorId(id, usuarioId);

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
      const usuarioId = req.usuario.id;
      const novaTarefa = await Tarefa.criar(titulo, descricao, usuarioId);
      res.status(201).json(novaTarefa);
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao criar tarefa.' });
    }
  },

  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descricao, concluida } = req.body;
      const usuarioId = req.usuario.id;
      const tarefaAtualizada = await Tarefa.atualizar(id, titulo, descricao, concluida, usuarioId);

      res.json(tarefaAtualizada);
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao atualizar tarefa.' });
    }
  },

  excluir: async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioId = req.usuario.id;
      await Tarefa.excluir(id, usuarioId);

      res.status(204).send(); 
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao excluir tarefa.' });
    }
  },

  concluir: async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioId = req.usuario.id; // Obtém do middleware de autenticação

        // Verifica se a tarefa existe e pertence ao usuário
        const tarefa = await Tarefa.buscarPorId(id, usuarioId);
        if (!tarefa) {
            return res.status(404).json({ erro: 'Tarefa não encontrada ou não pertence ao usuário' });
        }

        // Atualiza apenas o campo 'concluida' para true
        const tarefaAtualizada = await Tarefa.atualizar(
            id, 
            null,  // Não altera o título
            null,  // Não altera a descrição
            true,  // Marca como concluída
            usuarioId
        );

        res.json(tarefaAtualizada);
    } catch (err) {
        console.error('Erro ao concluir tarefa:', err);
        res.status(500).json({ erro: 'Erro ao concluir tarefa' });
    }
}
};

module.exports = tarefaController;
