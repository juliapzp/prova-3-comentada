const express = require("express"); // Importa o framework Express, usado para criar o servidor e gerenciar rotas.
const bodyParser = require("body-parser"); // Importa o body-parser para processar os dados no corpo das requisições.
const cors = require("cors"); // Importa o pacote CORS, que permite a comunicação entre diferentes origens (ex.: frontend e backend).

const app = express(); // Inicializa o aplicativo Express.

app.use(cors()); // Habilita o CORS para permitir requisições de qualquer origem.
// Caso deseje restringir as origens, pode-se passar um objeto como argumento, ex.: { origin: 'http://localhost:5173' }

app.use(bodyParser.json()); // Configura o body-parser para interpretar JSON no corpo das requisições.

const veiculos = []; // Inicializa um array vazio para armazenar os dados dos veículos.

app.get("/veiculos", (req, res) => {
  // Define a rota GET em "/veiculos" para listar todos os veículos.
  res.json(veiculos); // Retorna o array de veículos como uma resposta JSON.
});

app.get("/veiculos/:placa", (req, res) => {
  // Define a rota GET em "/veiculos/:placa" para buscar um veículo específico pela placa.
  const { placa } = req.params; // Extrai o parâmetro "placa" da URL.
  const veiculo = veiculos.find((v) => v.placa === placa); // Procura o veículo no array com a placa correspondente.
  if (veiculo) {
    res.json(veiculo); // Retorna os dados do veículo se encontrado.
  } else {
    res.status(404).json({ message: "Veículo não encontrado." }); // Retorna erro 404 se não encontrado.
  }
});

app.post("/veiculos", (req, res) => {
  // Define a rota POST em "/veiculos" para cadastrar um novo veículo.
  const { placa, marca, modelo, ano } = req.body; // Extrai os dados do corpo da requisição.
  const veiculo = { placa, marca, modelo, ano }; // Cria um objeto representando o veículo.
  veiculos.push(veiculo); // Adiciona o novo veículo ao array.
  res.status(201).json({ message: "Veículo cadastrado com sucesso." }); // Retorna uma mensagem de sucesso com status 201.
});

app.put("/veiculos/:placa", (req, res) => {
  // Define a rota PUT em "/veiculos/:placa" para atualizar informações de um veículo.
  const { placa } = req.params; // Extrai a placa da URL.
  const { marca, modelo, ano } = req.body; // Extrai os dados do corpo da requisição.
  const veiculo = veiculos.find((v) => v.placa === placa); // Procura o veículo no array.
  if (veiculo) {
    // Atualiza os campos do veículo apenas se valores foram fornecidos.
    veiculo.marca = marca || veiculo.marca;
    veiculo.modelo = modelo || veiculo.modelo;
    veiculo.ano = ano || veiculo.ano;
    res.json({ message: "Informações do veículo atualizadas com sucesso." }); // Confirma a atualização.
  } else {
    res.status(404).json({ message: "Veículo não encontrado." }); // Retorna erro 404 se o veículo não foi encontrado.
  }
});

app.delete("/veiculos/:placa", (req, res) => {
  // Define a rota DELETE em "/veiculos/:placa" para excluir um veículo.
  const { placa } = req.params; // Extrai a placa da URL.
  const veiculoIndex = veiculos.findIndex((v) => v.placa === placa); // Procura o índice do veículo no array.
  if (veiculoIndex !== -1) {
    veiculos.splice(veiculoIndex, 1); // Remove o veículo do array.
    res.json({ message: "Veículo excluído com sucesso." }); // Confirma a exclusão.
  } else {
    res.status(404).json({ message: "Veículo não encontrado." }); // Retorna erro 404 se o veículo não foi encontrado.
  }
});

const port = 3000; // Define a porta em que o servidor irá rodar.
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`); // Inicia o servidor e informa a URL no terminal.
});
