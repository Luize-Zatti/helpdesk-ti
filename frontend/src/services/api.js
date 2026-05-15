import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// Interceptor de requisição: adiciona o token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de resposta: se receber 401, desloga
// MAS ignora 401 da rota de login (que significa "credenciais erradas")
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const ehRotaLogin = error.config?.url?.includes('/auth/login');

    if (error.response?.status === 401 && !ehRotaLogin) {
      // Token expirou ou inválido enquanto usava o sistema → desloga
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/login';
    }

    // Sempre rejeita o erro pra que quem chamou possa tratar
    return Promise.reject(error);
  }
);

export default api;