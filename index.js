const express = require('express');
const fileUpload = require('express-fileupload');
var cors = require('cors')
const app =  express();
app.use(fileUpload());

const {config} = require('./config/index');
const materialesApi = require('./routes/materiales');
const archivosApi = require('./routes/archivos');

app.use(cors())
app.use(express.json())

materialesApi(app);
archivosApi(app); 

app.listen(config.port, function(){
    console.log(`Escuchando en http://localhost:${config.port}`)
})