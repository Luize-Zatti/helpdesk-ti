import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';
import Layout from '../components/Layout';
import chamadoService from '../services/chamadoService';

function ListaChamados() {
  const [chamados, setChamados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroPrioridade, setFiltroPrioridade] = useState('todas');
  const navigate = useNavigate();

  useEffect(() => {
    carregarChamados();
  }, []);

  async function carregarChamados() {
    try {
      setCarregando(true);
      const resposta = await chamadoService.listar();
      setChamados(resposta.data);
      setErro(null);
    } catch (err) {
      setErro('Erro ao carregar chamados: ' + err.message);
    } finally {
      setCarregando(false);
    }
  }

  async function deletarChamado(id) {
    if (!window.confirm('Deseja realmente excluir este chamado?')) return;
    try {
      await chamadoService.deletar(id);
      carregarChamados();
    } catch (err) {
      alert('Erro ao excluir: ' + err.message);
    }
  }

  function formatarId(id) {
    return 'CH-' + String(id).padStart(4, '0');
  }

  function formatarData(data) {
    return new Date(data).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  function formatarStatus(status) {
    const labels = {
      aberto: 'Aberto',
      em_atendimento: 'Em atendimento',
      aguardando_solicitante: 'Aguardando',
      concluido: 'Concluído',
      cancelado: 'Cancelado'
    };
    return labels[status] || status;
  }

  function corStatus(status) {
    const cores = {
      aberto: { bg: '#dbeafe', text: '#1d4ed8' },
      em_atendimento: { bg: '#fed7aa', text: '#c2410c' },
      aguardando_solicitante: { bg: '#fef3c7', text: '#a16207' },
      concluido: { bg: '#dcfce7', text: '#15803d' },
      cancelado: { bg: '#e5e7eb', text: '#4b5563' }
    };
    return cores[status] || cores.cancelado;
  }

  function corPrioridade(prioridade) {
    const cores = {
      baixa: { bg: '#dbeafe', text: '#1d4ed8' },
      media: { bg: '#fef3c7', text: '#a16207' },
      alta: { bg: '#fed7aa', text: '#c2410c' },
      urgente: { bg: '#fee2e2', text: '#b91c1c' }
    };
    return cores[prioridade] || cores.media;
  }

  function formatarPrioridade(p) {
    return p.charAt(0).toUpperCase() + p.slice(1);
  }

  const chamadosFiltrados = chamados.filter(c => {
    const matchBusca = busca === '' ||
      formatarId(c.id).toLowerCase().includes(busca.toLowerCase()) ||
      c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      (c.solicitante?.nome || '').toLowerCase().includes(busca.toLowerCase());
    const matchStatus = filtroStatus === 'todos' || c.status === filtroStatus;
    const matchPrioridade = filtroPrioridade === 'todas' || c.prioridade === filtroPrioridade;
    return matchBusca && matchStatus && matchPrioridade;
  });

  const inputStyle = {
    height: '40px', padding: '0 14px', borderRadius: '8px',
    border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none', backgroundColor: '#fff'
  };

  const cardStyle = {
    backgroundColor: '#fff', borderRadius: '8px',
    border: '1px solid #e5e7eb', padding: '16px'
  };

  return (
    <Layout breadcrumb="Chamados">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#2b2b2b', marginBottom: '4px' }}>Chamados</h1>
          <p style={{ fontSize: '14px', color: '#526374' }}>Gerencie todos os chamados do sistema</p>
        </div>
        <button
          onClick={() => navigate('/chamados/novo')}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: '#ff7a00', color: '#fff', border: 'none',
            padding: '10px 18px', borderRadius: '8px', fontSize: '14px',
            fontWeight: '500', cursor: 'pointer'
          }}
        >
          <Plus size={16} />
          Novo Chamado
        </button>
      </div>

      <div style={{ ...cardStyle, marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#7f99b4' }} />
            <input
              type="text"
              placeholder="Buscar por ID, título ou solicitante..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{ ...inputStyle, width: '100%', paddingLeft: '38px' }}
            />
          </div>
          <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} style={inputStyle}>
            <option value="todos">Todos os status</option>
            <option value="aberto">Aberto</option>
            <option value="em_atendimento">Em atendimento</option>
            <option value="aguardando_solicitante">Aguardando</option>
            <option value="concluido">Concluído</option>
            <option value="cancelado">Cancelado</option>
          </select>
          <select value={filtroPrioridade} onChange={(e) => setFiltroPrioridade(e.target.value)} style={inputStyle}>
            <option value="todas">Todas as prioridades</option>
            <option value="urgente">Urgente</option>
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>
        </div>
      </div>

      <div style={cardStyle}>
        {carregando && <p style={{ padding: '20px', textAlign: 'center' }}>Carregando...</p>}
        {erro && <p style={{ padding: '20px', color: '#dc2626' }}>{erro}</p>}

        {!carregando && !erro && chamadosFiltrados.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <Search size={48} style={{ color: '#9ca3af', margin: '0 auto 12px' }} />
            <p style={{ fontSize: '14px', fontWeight: '500', color: '#2b2b2b', marginBottom: '4px' }}>
              Nenhum chamado encontrado
            </p>
            <p style={{ fontSize: '14px', color: '#526374' }}>
              {chamados.length === 0 ? 'Clique em "Novo Chamado" para criar o primeiro' : 'Tente ajustar os filtros'}
            </p>
          </div>
        )}

        {!carregando && !erro && chamadosFiltrados.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f4f6f8' }}>
                <tr>
                  {['ID', 'Título', 'Solicitante', 'Categoria', 'Prioridade', 'Status', 'Responsável', 'Aberto em', 'Ações'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: '500', color: '#526374' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chamadosFiltrados.map((c) => {
                  const cs = corStatus(c.status);
                  const cp = corPrioridade(c.prioridade);
                  return (
                    <tr key={c.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#2b2b2b' }}>{formatarId(c.id)}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#2b2b2b', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.titulo}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#526374' }}>{c.solicitante?.nome || '-'}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#526374' }}>{c.categoria?.nome || '-'}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ backgroundColor: cp.bg, color: cp.text, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>
                          {formatarPrioridade(c.prioridade)}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ backgroundColor: cs.bg, color: cs.text, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>
                          {formatarStatus(c.status)}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#526374' }}>{c.tecnico?.nome || '-'}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#526374' }}>{formatarData(c.created_at)}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button title="Ver detalhes" style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                            <Eye size={16} color="#526374" />
                          </button>
                          <button title="Editar" style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                            <Edit size={16} color="#526374" />
                          </button>
                          <button onClick={() => deletarChamado(c.id)} title="Excluir" style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                            <Trash2 size={16} color="#ef4444" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ListaChamados;