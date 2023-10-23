const express = require('express');
const conectarDB = require('./config/db');

//Creamos el servidor

const app = express();
conectarDB();

app.use(express.json());
app.use('/api/horario', require('./routes/horario'));


app.listen(4000, ()=>{
    console.log('El servidor esta funcionando bien')
})