import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Componente que protege rotas: só renderiza o conteúdo se o usuário estiver logado
// Se não estiver, redireciona pra tela de login
function PrivateRoute({ children, perfisPermitidos }) {
  const { autenticado, usuario } = useAuth();

  // Não está logado, manda pro login
  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  // Se a rota exige perfis específicos e o usuário não tem o perfil correto
  // manda pra tela principal (chamados)
  if (perfisPermitidos && !perfisPermitidos.includes(usuario.perfil)) {
    return <Navigate to="/chamados" replace />;
  }

  // Tudo certo, renderiza o conteúdo da rota
  return children;
}

export default PrivateRoute;