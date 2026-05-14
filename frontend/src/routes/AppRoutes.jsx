import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListaChamados from '../pages/ListaChamados';
import NovoChamado from '../pages/NovoChamado';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/chamados" />} />
        <Route path="/chamados" element={<ListaChamados />} />
        <Route path="/chamados/novo" element={<NovoChamado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;