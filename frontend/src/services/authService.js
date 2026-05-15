import api from './api';

// Faz login chamando a API /auth/login
// Retorna { usuario, token } se sucesso
// Lança erro se credenciais inválidas
export async function login(email, senha) {
  const response = await api.post('/auth/login', { email, senha });
  return response.data;
}

// Salva token e usuário no localStorage
export function salvarSessao(token, usuario) {
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));
}

// Remove sessão do localStorage
export function limparSessao() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
}

// Recupera o usuário logado do localStorage
export function getUsuarioLogado() {
  const usuarioStr = localStorage.getItem('usuario');
  if (!usuarioStr) return null;
  try {
    return JSON.parse(usuarioStr);
  } catch {
    return null;
  }
}

// Verifica se tem token salvo (usuário está logado)
export function estaLogado() {
  return !!localStorage.getItem('token');
}