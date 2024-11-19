import { StrictMode } from 'react'; // Importa StrictMode para destacar potenciais problemas no código
import { createRoot } from 'react-dom/client'; // Importa a API para renderizar o React 18
import './index.css'; // Importa o arquivo CSS global
import App from './App.jsx'; // Importa o componente principal da aplicação

// Renderiza o componente raiz no elemento HTML com o ID "root"
createRoot(document.getElementById('root')).render(
  <StrictMode> 
    {/* Envolve o App em StrictMode para ativar verificações adicionais em modo de desenvolvimento */}
    <App />
  </StrictMode>
);
