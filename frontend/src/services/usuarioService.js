import api from './api';

const usuarioService = {
  listar() {
    return api.get('/usuarios');
  }
};

export default usuarioService;