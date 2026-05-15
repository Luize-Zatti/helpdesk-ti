module.exports = (perfisPermitidos) => {
  return (req, res, next) => {
    if (!req.usuarioPerfil) {
      return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    if (!perfisPermitidos.includes(req.usuarioPerfil)) {
      return res.status(403).json({ erro: 'Acesso negado. Permissão insuficiente.' });
    }

    return next();
  };
};