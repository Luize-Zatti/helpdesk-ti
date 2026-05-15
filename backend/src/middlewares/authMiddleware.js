const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const partes = authHeader.split(' ');
  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return res.status(401).json({ erro: 'Token mal formatado' });
  }

  const token = partes[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id;
    req.usuarioPerfil = decoded.perfil;
    return next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};