import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ListaChamados from "../pages/ListaChamados";
import NovoChamado from "../pages/NovoChamado";
import NaoEncontrada from "../pages/NaoEncontrada";
import PrivateRoute from "../components/PrivateRoute";
import EditarChamado from "../pages/EditarChamado";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública - login */}
        <Route path="/login" element={<Login />} />

        {/* Raiz - redireciona pra chamados */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navigate to="/chamados" replace />
            </PrivateRoute>
          }
        />

        {/* Chamados (implementado) */}
        <Route
          path="/chamados"
          element={
            <PrivateRoute>
              <ListaChamados />
            </PrivateRoute>
          }
        />
        <Route
          path="/chamados/novo"
          element={
            <PrivateRoute>
              <NovoChamado />
            </PrivateRoute>
          }
        />

        <Route
          path="/chamados/:id/editar"
          element={
            <PrivateRoute>
              <EditarChamado />
            </PrivateRoute>
          }
        />

        {/* Qualquer outra rota - mostra 404 */}
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
