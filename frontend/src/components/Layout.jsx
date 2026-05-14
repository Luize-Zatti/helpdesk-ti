import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Ticket, Monitor, FolderTree, Users, BarChart3, LogOut } from 'lucide-react';

function Layout({ children, breadcrumb }) {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/chamados', label: 'Chamados', icon: Ticket },
    { path: '/equipamentos', label: 'Equipamentos', icon: Monitor },
    { path: '/categorias', label: 'Categorias', icon: FolderTree },
    { path: '/usuarios', label: 'Usuários', icon: Users },
    { path: '/relatorios', label: 'Relatórios', icon: BarChart3 }
  ];

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
          {menuItems.map((item) => {
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
              AD
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '500' }}>Admin User</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Administrador</div>
            </div>
          </div>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#cbd5e1',
            fontSize: '13px',
            padding: '6px 0',
            cursor: 'pointer'
          }}>
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