import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Ticket, Monitor, FolderTree, Users, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Layout({ children, breadcrumb }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, fazerLogout } = useAuth();

  // Itens do menu com os perfis que podem ver cada item
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, perfis: ['admin', 'tecnico'] },
    { path: '/chamados', label: 'Chamados', icon: Ticket, perfis: ['admin', 'tecnico', 'solicitante'] },
    { path: '/equipamentos', label: 'Equipamentos', icon: Monitor, perfis: ['admin'] },
    { path: '/categorias', label: 'Categorias', icon: FolderTree, perfis: ['admin'] },
    { path: '/usuarios', label: 'Usuários', icon: Users, perfis: ['admin'] },
    { path: '/relatorios', label: 'Relatórios', icon: BarChart3, perfis: ['admin'] }
  ];

  // Filtra os itens do menu de acordo com o perfil do usuário logado
  const menuVisivel = menuItems.filter(item =>
    usuario && item.perfis.includes(usuario.perfil)
  );

  // Pega as iniciais do nome do usuário (ex: "Admin Sistema" → "AS")
  function getIniciais(nome) {
    if (!nome) return '?';
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  }

  // Formata o perfil pra exibir bonito (ex: "admin" → "Administrador")
  function formatarPerfil(perfil) {
    const mapa = {
      admin: 'Administrador',
      tecnico: 'Técnico',
      solicitante: 'Solicitante'
    };
    return mapa[perfil] || perfil;
  }

  function handleLogout() {
    fazerLogout();
    navigate('/login');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
      <aside style={{
        width: '240px',
        backgroundColor: '#1e2939',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#ff7a00',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Ticket size={20} />
            </div>
            <span style={{ fontSize: '17px', fontWeight: '600' }}>HelpDesk TI</span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '12px' }}>
          {menuVisivel.map((item) => {
            const Icon = item.icon;
            const ativo = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  marginBottom: '4px',
                  borderRadius: '8px',
                  color: ativo ? '#fff' : '#cbd5e1',
                  backgroundColor: ativo ? '#ff7a00' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: ativo ? '500' : '400'
                }}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid #334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#ff7a00',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {getIniciais(usuario?.nome)}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{
                fontSize: '13px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {usuario?.nome || 'Usuário'}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                {formatarPerfil(usuario?.perfil)}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#cbd5e1',
              fontSize: '13px',
              padding: '6px 0',
              cursor: 'pointer'
            }}
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: '240px' }}>
        <header style={{
          backgroundColor: '#fff',
          padding: '14px 24px',
          borderBottom: '1px solid #e5e7eb',
          fontSize: '14px',
          color: '#526374'
        }}>
          {breadcrumb || 'Início'}
        </header>

        <div style={{ padding: '24px' }}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;