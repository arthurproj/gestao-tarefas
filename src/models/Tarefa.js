const db = require('../config/db');

const TarefaModel = {
  buscarTodas: async () => {
    const resultado = await db.query('SELECT * FROM tarefas ORDER BY id ASC');
    return resultado.rows;
  },

  buscarPorId: async (id) => {
    const resultado = await db.query('SELECT * FROM tarefas WHERE id = $1', [id]);
    return resultado.rows[0];
  },

  criar: async (titulo, descricao) => {
    const resultado = await db.query(
      'INSERT INTO tarefas (titulo, descricao, concluida) VALUES ($1, $2, false) RETURNING *',
      [titulo, descricao]
    );
    return resultado.rows[0];
  },

  atualizar: async (id, titulo, descricao, concluida) => {
    const resultado = await db.query(
      'UPDATE tarefas SET titulo = $1, descricao = $2, concluida = $3 WHERE id = $4 RETURNING *',
      [titulo, descricao, concluida, id]
    );
    return resultado.rows[0];
  },

  excluir: async (id) => {
    await db.query('DELETE FROM tarefas WHERE id = $1', [id]);
  }
};

module.exports = TarefaModel;
