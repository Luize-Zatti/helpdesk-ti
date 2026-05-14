import api from './api';

const categoriaService = {
  listar() {
    return api.get('/categorias');
  }
};

export default categoriaService;