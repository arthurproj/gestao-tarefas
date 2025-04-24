const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({ erro: 'Usuário já cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
      [nome, email, senhaHash]
    );

    res.status(201).json(novoUsuario.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao registrar usuário.' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  // Validação simples
  if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  try {
      const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
      
      if (resultado.rows.length === 0) {
          return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      const usuario = resultado.rows[0];
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
          return res.status(401).json({ erro: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
          { id: usuario.id, email: usuario.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

      res.json({ token, nome: usuario.nome });

  } catch (err) {
      console.error('Erro no login:', err);
      res.status(500).json({ erro: 'Erro interno no servidor' });
  }
};