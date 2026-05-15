import { FileQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function NaoEncontrada() {
  const { autenticado } = useAuth();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f4f6f8',
      padding: '24px',
      textAlign: 'center',
      gap: '20px'
    }}>
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <FileQuestion size={50} color="#ff7a00" />
      </div>
      <div>
        <h1 style={{ fontSize: '48px', color: '#2b2b2b', marginBottom: '4px', fontWeight: 700 }}>
          404
        </h1>
        <h2 style={{ fontSize: '20px', color: '#2b2b2b', marginBottom: '8px' }}>
          Página não encontrada
        </h2>
        <p style={{ color: '#526374', fontSize: '15px', maxWidth: '420px' }}>
          A página que você está procurando não existe ou foi movida.
        </p>
      </div>
      <Link
        to={autenticado ? '/chamados' : '/login'}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ff7a00',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 500
        }}
      >
        {autenticado ? 'Voltar para Chamados' : 'Ir para Login'}
      </Link>
    </div>
  );
}

export default NaoEncontrada;