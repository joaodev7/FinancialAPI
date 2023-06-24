const express = require('express');
const mongoose = require('mongoose');
const { config } = require('dotenv');
require('dotenv').config();
const app = express();

// Configuração de middleware para ler JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importação das rotas
const userRoutes = require('./routes/userRoutes');

// Rotas da API
app.use('/createuser', userRoutes);
app.use('/getuser', userRoutes);
app.use('/getuserbyid', userRoutes);
app.use('/updateuser', userRoutes);
app.use('/deleteuserbyid', userRoutes);

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@data-processing-cluster.w64rnto.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(3000);
    console.log("Conectamos ao MongoDB!");
  })
  .catch((err) => console.log(err));
