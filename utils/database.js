const mongoose = require('mongoose');
const messages = require('./messages/databaseMessages');

const connectToDatabase = async () => {
  try {
    const DB_USER = process.env.DB_USER;
    const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
    const DB_NAME = process.env.DB_NAME;

    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_NAME}/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(messages.CONNECTING);
  } catch (error) {
    console.error(messages.UNABLE_TO_CONNECT, error);
    throw error;
  }
};

module.exports = { connectToDatabase };
