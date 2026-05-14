import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import chamadoService from '../services/chamadoService';
import categoriaService from '../services/categoriaService';
import usuarioService from '../services/usuarioService';

function NovoChamado() {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    titulo: '',
    descricao: '',
    categoria_id: '',
    solicitante_id: '',
    prioridade: 'media'
  });
  const [categorias, setCategorias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const [resCategorias, resUsuarios] = await Promise.all([
        categoriaService.listar(),
        usuarioService.listar()
      ]);
      setCategorias(resCategorias.data);
      setUsuarios(resUsuarios.data);
    } catch (err) {
      setErro('Erro ao carregar dados: ' + err.message);
    }
  }

  function handleChange(campo, valor) {
    setFormulario({ ...formulario, [campo]: valor });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSalvando(true);
    setErro(null);
    try {
      await chamadoService.criar({
        ...formulario,
        categoria_id: Number(formulario.categoria_id),
        solicitante_id: Number(formulario.solicitante_id)
      });
      navigate('/chamados');
    } catch (err) {
      setErro('Erro ao criar chamado: ' + (err.response?.data?.erro || err.message));
      setSalvando(false);
    }
  }

  const inputStyle = {
    width: '100%', height: '40px', padding: '0 14px', borderRadius: '8px',
    border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none', backgroundColor: '#fff'
  };

  const labelStyle = {
    display: 'block', fontSize: '13px', fontWeight: '500',
    color: '#2b2b2b', marginBottom: '6px'
  };

  return (
    <Layout breadcrumb="Chamados › Novo">
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#2b2b2b', marginBottom: '4px' }}>Novo Chamado</h1>
        <p style={{ fontSize: '14px', color: '#526374' }}>Preencha os dados para abrir um novo chamado</p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb', maxWidth: '720px' }}
      >
        <div style={{ marginBottom: '18px' }}>
          <label style={labelStyle}>Título *</label>
          <input
            type="text"
            value={formulario.titulo}
            onChange={(e) => handleChange('titulo', e.target.value)}
            required
            style={inputStyle}
            placeholder="Ex: Computador não liga"
          />
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label style={labelStyle}>Descrição *</label>
          <textarea
            value={formulario.descricao}
            onChange={(e) => handleChange('descricao', e.target.value)}
            required
            rows={4}
            style={{ ...inputStyle, height: 'auto', padding: '10px 14px', resize: 'vertical' }}
            placeholder="Descreva o problema detalhadamente..."
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
          <div>
            <label style={labelStyle}>Categoria *</label>
            <select
              value={formulario.categoria_id}
              onChange={(e) => handleChange('categoria_id', e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Solicitante *</label>
            <select
              value={formulario.solicitante_id}
              onChange={(e) => handleChange('solicitante_id', e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Selecione o solicitante</option>
              {usuarios.map(u => (
                <option key={u.id} value={u.id}>{u.nome}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '24px', maxWidth: '300px' }}>
          <label style={labelStyle}>Prioridade</label>
          <select
            value={formulario.prioridade}
            onChange={(e) => handleChange('prioridade', e.target.value)}
            style={inputStyle}
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>

        {erro && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
            {erro}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="submit"
            disabled={salvando}
            style={{
              backgroundColor: '#ff7a00', color: '#fff', border: 'none',
              padding: '10px 24px', borderRadius: '8px', fontSize: '14px',
              fontWeight: '500', cursor: salvando ? 'not-allowed' : 'pointer',
              opacity: salvando ? 0.6 : 1
            }}
          >
            {salvando ? 'Salvando...' : 'Criar Chamado'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/chamados')}
            style={{
              backgroundColor: '#fff', color: '#526374', border: '1px solid #e5e7eb',
              padding: '10px 24px', borderRadius: '8px', fontSize: '14px',
              fontWeight: '500', cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default NovoChamado;