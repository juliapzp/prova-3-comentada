const express = require('express'); // Importa o framework Express
const router = express.Router(); // Cria uma instância do Router para definir rotas modularmente

const controller = require('./controller'); // Importa o controlador com as funções que implementam a lógica das rotas

// Define a rota GET para listar todos os veículos, chamando a função do controlador
router.get('/veiculos', controller.getVeiculos);

// Define a rota GET para buscar um veículo específico por placa, chamando a função correspondente do controlador
router.get('/veiculos/:placa', controller.getVeiculosByPlaca);

// Define a rota POST para cadastrar um novo veículo, utilizando a função do controlador
router.post('/veiculos', controller.createVeiculos);

// Define a rota PUT para atualizar as informações de um veículo específico pela placa
router.put('/veiculos/:placa', controller.updateVeiculos);

// Define a rota DELETE para excluir um veículo específico pela placa
router.delete('/veiculos/:placa', controller.deleteVeiculos);

module.exports = router; // Exporta o router para que possa ser usado no servidor principal
