require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/connection');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'HelpDesk TI API rodando' });
});

const PORT = process.env.PORT || 3001;

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com PostgreSQL estabelecida');
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com PostgreSQL:', error.message);
  });