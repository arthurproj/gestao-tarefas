const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestão de Tarefas',
      version: '1.0.0',
      description: 'API para gerenciar tarefas de um usuário',
    },
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js', './src/docs/swagger.js'],  // Certifique-se de que esses caminhos estão corretos
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário
 *           example: 1
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *           example: "João Silva"
 *         email:
 *           type: string
 *           description: Email do usuário
 *           example: "joao@example.com"
 *         senha:
 *           type: string
 *           description: Senha do usuário
 *           example: "senha123"
 *     Tarefa:
 *       type: object
 *       required:
 *         - titulo
 *         - descricao
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da tarefa
 *           example: 1
 *         titulo:
 *           type: string
 *           description: Título da tarefa
 *           example: "Tarefa de Teste"
 *         descricao:
 *           type: string
 *           description: Descrição da tarefa
 *           example: "Esta tarefa deve ser concluída até o final do mês"
 *         concluida:
 *           type: boolean
 *           description: Indica se a tarefa foi concluída
 *           example: false
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Authorization:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * security:
 *   - Authorization: []
 */

