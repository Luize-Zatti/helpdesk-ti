import { createContext, useContext, useState } from 'react';
import * as authService from '../services/authService';

// Cria o contexto (uma "caixa" que vai guardar o estado de autenticação)
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Estado do usuário logado (inicializa pegando do localStorage se já existir)
  const [usuario, setUsuario] = useState(() => authService.getUsuarioLogado());

  // Função de login: chama a API, salva no localStorage e atualiza o estado
  async function fazerLogin(email, senha) {
    const data = await authService.login(email, senha);
    authService.salvarSessao(data.token, data.usuario);
    setUsuario(data.usuario);
    return data.usuario;
  }

  // Função de logout: limpa o localStorage e o estado
  function fazerLogout() {
    authService.limparSessao();
    setUsuario(null);
  }

  // Verifica se o usuário está autenticado
  const autenticado = !!usuario;

  // Disponibiliza os valores pros componentes filhos
  return (
    <AuthContext.Provider value={{ usuario, autenticado, fazerLogin, fazerLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}