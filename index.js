const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes');
const { config } = require('dotenv');
require('dotenv').config();
const app = express()

//CONFIG DE MIDLEWARE PARA LER JSON
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())
app.use(express.static('public'));

//ROTA INICIAL (TESTE)
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' })
})
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });


//ROTA API
app.use('/createuser', userRoutes)
app.use('/getuser', userRoutes)
app.use('/getuserbyid', userRoutes)
app.use('/updateuser', userRoutes)
app.use('/deleteuserbyid', userRoutes)

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.uve5nky.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000)
        console.log("Conectamos ao MongoDB!")
    })
    .catch((err) => console.log(err))

