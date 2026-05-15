import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { fazerLogin } = useAuth();

  // Estados do formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await fazerLogin(email, senha);
      // Login OK → redireciona pra tela de chamados
      navigate('/chamados');
    } catch (err) {
      // Mostra mensagem de erro vinda do backend (ou genérica)
      const mensagem = err.response?.data?.erro || err.response?.data?.message || 'Email ou senha inválidos';
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Lado esquerdo - Branding (só aparece em telas grandes) */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #526374 0%, #2b2b2b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px',
        color: '#fff'
      }}
      className="login-branding"
      >
        <div style={{ textAlign: 'center', maxWidth: '420px' }}>
          <div style={{
            width: '96px',
            height: '96px',
            margin: '0 auto 24px',
            borderRadius: '20px',
            backgroundColor: '#ff7a00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Ticket size={48} color="#fff" strokeWidth={2} />
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 600, marginBottom: '16px' }}>
            HelpDesk TI
          </h1>
          <p style={{ fontSize: '17px', opacity: 0.85, lineHeight: 1.5 }}>
            Sistema completo de gerenciamento de chamados e suporte técnico para sua empresa
          </p>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        backgroundColor: '#fff'
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#2b2b2b', marginBottom: '8px' }}>
              Bem-vindo de volta
            </h2>
            <p style={{ color: '#526374', fontSize: '15px' }}>
              Faça login para acessar o sistema
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Campo Email */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#2b2b2b', marginBottom: '6px' }}>
                E-mail
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={carregando}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  fontSize: '14px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#ff7a00')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#2b2b2b', marginBottom: '6px' }}>
                Senha
              </label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                disabled={carregando}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  fontSize: '14px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#ff7a00')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              />
            </div>

            {/* Mensagem de erro */}
            {erro && (
              <div style={{
                padding: '10px 14px',
                backgroundColor: '#fee2e2',
                color: '#b91c1c',
                borderRadius: '8px',
                fontSize: '13px'
              }}>
                {erro}
              </div>
            )}

            {/* Botão de login */}
            <button
              type="submit"
              disabled={carregando}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '15px',
                fontWeight: 500,
                color: '#fff',
                backgroundColor: carregando ? '#cbd5e1' : '#ff7a00',
                border: 'none',
                borderRadius: '8px',
                cursor: carregando ? 'not-allowed' : 'pointer',
                marginTop: '8px',
                transition: 'background-color 0.2s'
              }}
            >
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;