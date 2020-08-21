const express = require('express');
var cors = require('cors')
const app =  express();

const {config} = require('./config/index');
const materialesApi = require('./routes/materiales');

app.use(cors())
app.use(express.json())

materialesApi(app);

app.listen(config.port, function(){
    console.log(`Escuchando en http://localhost:${config.port}`)
})