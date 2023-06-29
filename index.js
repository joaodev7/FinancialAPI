const express = require('express');
const { connectToDatabase } = require('./utils/database.js');
const messages = require('./utils/messages/databaseMessages.js');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(messages.UNABLE_TO_CONNECT, error);
  });
