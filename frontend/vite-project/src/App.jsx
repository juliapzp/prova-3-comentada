import React, { useState, useEffect } from 'react'; // Importa React e os hooks useState e useEffect para manipular estados e efeitos colaterais
import axios from 'axios'; // Biblioteca para realizar requisições HTTP
import './App.css'; // Arquivo de estilos para o componente

const App = () => {
  const [veiculos, setVeiculos] = useState([]); // Estado para armazenar a lista de veículos
  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano: ''
  }); // Estado para armazenar os dados do formulário
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar se o formulário está em modo de edição

  // Efeito colateral que carrega os veículos ao montar o componente
  useEffect(() => {
    fetchVeiculos();
  }, []);

  // Função para buscar a lista de veículos do backend
  const fetchVeiculos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/veiculos');
      setVeiculos(response.data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error(error); // Exibe erros no console para depuração
    }
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Atualiza o campo correspondente no estado
  };

  // Função para criar um novo veículo
  const handleCreateVeiculos = async e => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      await axios.post('http://localhost:3000/veiculos', formData); // Envia os dados para o backend
      setFormData({
        placa: '',
        marca: '',
        modelo: '',
        ano: ''
      }); // Limpa o formulário
      fetchVeiculos(); // Atualiza a lista de veículos
    } catch (error) {
      console.error(error);
    }
  };

  // Função para atualizar os dados de um veículo existente
  const handleUpdateVeiculos = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/veiculos/${formData.placa}`, formData); // Atualiza os dados no backend
      setFormData({
        placa: '',
        marca: '',
        modelo: '',
        ano: ''
      }); // Limpa o formulário
      setIsEditing(false); // Sai do modo de edição
      fetchVeiculos(); // Atualiza a lista de veículos
    } catch (error) {
      console.error(error);
    }
  };

  // Função para excluir um veículo pelo número da placa
  const handleDeleteVeiculos = async placa => {
    try {
      await axios.delete(`http://localhost:3000/veiculos/${placa}`); // Envia a requisição de exclusão
      fetchVeiculos(); // Atualiza a lista de veículos
    } catch (error) {
      console.error(error);
    }
  };

  // Função para carregar os dados de um veículo no formulário para edição
  const handleEditVeiculo = veiculo => {
    setFormData({
      placa: veiculo.placa,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: veiculo.ano
    }); // Preenche o formulário com os dados do veículo
    setIsEditing(true); // Ativa o modo de edição
  };

  return (
    <div>
      <h1>Veículos</h1>
      {/* Formulário para cadastro ou atualização */}
      <form onSubmit={isEditing ? handleUpdateVeiculos : handleCreateVeiculos}>
        <label>
          Placa:
          <input
            type="text"
            name="placa"
            value={formData.placa}
            onChange={handleInputChange}
            disabled={isEditing} // Desabilita o campo de placa durante a edição
          />
        </label>
        <label>
          Marca:
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Modelo:
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Ano:
          <input
            type="text"
            name="ano"
            value={formData.ano}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

      {/* Lista de veículos */}
      <ul>
        {veiculos.map(veiculo => (
          <li key={veiculo.placa}>
            {veiculo.placa} - {veiculo.marca} - {veiculo.modelo} - {veiculo.ano}
            {/* Botão para editar o veículo */}
            <button onClick={() => handleEditVeiculo(veiculo)}>Editar</button>
            {/* Botão para excluir o veículo */}
            <button onClick={() => handleDeleteVeiculos(veiculo.placa)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App; // Exporta o componente para ser usado em outros arquivos
