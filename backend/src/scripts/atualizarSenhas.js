require('dotenv').config();
const bcrypt = require('bcryptjs');
const { Usuario, sequelize } = require('../models');

async function atualizar() {
  try {
    const senhaPadrao = await bcrypt.hash('123456', 10);

    const [count] = await Usuario.update(
      { senha: senhaPadrao },
      { where: { senha: 'temp' } }
    );

    console.log(`${count} usuários atualizados com senha "123456" (hash)`);
    await sequelize.close();
  } catch (err) {
    console.error('Erro:', err.message);
    await sequelize.close();
  }
}

atualizar();