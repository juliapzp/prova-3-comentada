const express = require('express'); // Importa o framework Express para criar o servidor
const bodyParser = require('body-parser'); // Importa o body-parser para processar JSON no corpo das requisições
const routes = require('./routes'); // Importa o arquivo de rotas modularizadas
const cors = require('cors'); // Importa o CORS para lidar com requisições de origens diferentes

const app = express(); // Inicializa o aplicativo Express

// Middleware para processar JSON no corpo das requisições
app.use(bodyParser.json());

// Middleware para habilitar CORS, permitindo que outras origens acessem a API
app.use(cors());

// Usa as rotas definidas no arquivo "routes.js"
// O prefixo '/' define que as rotas serão usadas a partir da raiz (ex.: "/veiculos")
app.use('/', routes);

// Define a porta em que o servidor será executado
const port = 3000;

// Inicia o servidor e exibe uma mensagem no console indicando a URL
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
