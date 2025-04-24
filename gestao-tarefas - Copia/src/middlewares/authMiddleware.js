const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Ex: Bearer TOKEN

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ erro: 'Token inválido.' });
    }

    req.usuario = usuario; // payload do token (id e nome)
    next();
  });
}

module.exports = autenticarToken;
