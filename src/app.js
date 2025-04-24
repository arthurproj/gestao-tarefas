const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./docs/swagger.js');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const tarefaRoutes = require('./routes/tarefaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(express.json());
app.use(cors());
app.use('/api', tarefaRoutes);
app.use('/api', usuarioRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/registro.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registro.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));  // Serve o index.html
});
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));  // Serve o login.html
});
app.get('/tarefas.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'tarefas.html'));  // Serve o tarefas.html
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
