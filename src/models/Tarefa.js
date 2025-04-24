//Fazer PESQUISAS no bando de dados para TAREFAS
const db = require('../config/db');

const TarefaModel = {
  buscarTodas: async (usuarioId) => {
    const resultado = await db.query(
      'SELECT * FROM tarefas WHERE usuario_id = $1 ORDER BY id ASC', 
      [usuarioId]
    );
    return resultado.rows;
  },

  buscarPorId: async (id, usuarioId) => {
    const resultado = await db.query(
      'SELECT * FROM tarefas WHERE id = $1 AND usuario_id = $2', 
      [id, usuarioId]
    );
    return resultado.rows[0];
  },

  criar: async (titulo, descricao, usuarioId) => {
    const resultado = await db.query(
      'INSERT INTO tarefas (titulo, descricao, concluida, usuario_id) VALUES ($1, $2, false, $3) RETURNING *', 
      [titulo, descricao, usuarioId]
    );
    return resultado.rows[0];
  },

  atualizar: async (id, titulo, descricao, concluida, usuarioId) => {
    const resultado = await db.query(
        `UPDATE tarefas 
         SET 
             titulo = COALESCE($1, titulo),
             descricao = COALESCE($2, descricao),
             concluida = COALESCE($3, concluida)
         WHERE id = $4 AND usuario_id = $5 
         RETURNING *`,
        [titulo, descricao, concluida, id, usuarioId]
    );
    return resultado.rows[0];
},

  excluir: async (id, usuarioId) => {
    await db.query(
      'DELETE FROM tarefas WHERE id = $1 AND usuario_id = $2', 
      [id, usuarioId]
    );
  }
};

module.exports = TarefaModel;
