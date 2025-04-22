const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const tarefaRoutes = require('./routes/tarefaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(express.json());

app.use('/api', tarefaRoutes);
app.use('/api', usuarioRoutes);

app.get('/', (req, res) => {
  res.send('Bem-vindo ao Gerenciador de Tarefas!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
