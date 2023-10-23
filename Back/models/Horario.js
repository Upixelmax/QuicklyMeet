const mongoose = require('mongoose');

const HorarioSchema = mongoose.Schema({
    fecha:{
        type:String,
        required: true
    },
    hora:{
        type:String,
        required: true
    },
    estado:{
        type:String,
        required: true,
        default: "Disponible"
    },
    fechaCreación:{
        type:Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Horario', HorarioSchema);