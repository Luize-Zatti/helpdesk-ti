import api from './api';

const chamadoService = {
  listar() {
    return api.get('/chamados');
  },

  buscarPorId(id) {
    return api.get(`/chamados/${id}`);
  },

  criar(dados) {
    return api.post('/chamados', dados);
  },

  atualizar(id, dados) {
    return api.put(`/chamados/${id}`, dados);
  },

  deletar(id) {
    return api.delete(`/chamados/${id}`);
  }
};

export default chamadoService;