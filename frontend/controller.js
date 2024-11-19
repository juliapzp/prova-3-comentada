const veiculos = []; // Array para armazenar os veículos

function getVeiculos(req, res) {
    res.json(veiculos); // Retorna todos os veículos
}

function getVeiculosByPlaca(req, res) {
    const { placa } = req.params; // Extrai a placa dos parâmetros da URL
    const veiculo = veiculos.find(v => v.placa === placa); // Encontra o veículo correspondente
    if (veiculo) {
        res.json(veiculo); // Retorna o veículo se encontrado
    } else {
        res.status(404).json({ message: 'Veículo não encontrado.' }); // Retorna erro 404
    }
}

function createVeiculos(req, res) {
    const { placa, marca, modelo, ano } = req.body; // Extrai os dados do corpo da requisição

    // Cria um novo objeto veículo
    const veiculo = { placa, marca, modelo, ano };

    veiculos.push(veiculo); // Adiciona o veículo ao array
    res.status(201).json({ message: 'Veículo cadastrado com sucesso.' }); // Retorna confirmação de cadastro
}

function updateVeiculos(req, res) {
    const { placa } = req.params; // Extrai a placa dos parâmetros da URL
    const { marca, modelo, ano } = req.body; // Extrai os dados do corpo da requisição

    const veiculo = veiculos.find(v => v.placa === placa); // Procura o veículo correspondente
    if (veiculo) {
        // Atualiza somente os campos fornecidos
        veiculo.marca = marca || veiculo.marca;
        veiculo.modelo = modelo || veiculo.modelo;
        veiculo.ano = ano || veiculo.ano;
        res.json({ message: 'Informações do veículo atualizadas com sucesso.' }); // Confirma a atualização
    } else {
        res.status(404).json({ message: 'Veículo não encontrado.' }); // Retorna erro 404
    }
}

function deleteVeiculos(req, res) {
    const { placa } = req.params; // Extrai a placa dos parâmetros da URL
    const veiculoIndex = veiculos.findIndex(v => v.placa === placa); // Procura o índice do veículo correspondente
    if (veiculoIndex !== -1) {
        veiculos.splice(veiculoIndex, 1); // Remove o veículo do array
        res.json({ message: 'Veículo excluído com sucesso.' }); // Confirma a exclusão
    } else {
        res.status(404).json({ message: 'Veículo não encontrado.' }); // Retorna erro 404
    }
}

// Exporta as funções para uso em outros arquivos
module.exports = { getVeiculos, getVeiculosByPlaca, createVeiculos, updateVeiculos, deleteVeiculos };
