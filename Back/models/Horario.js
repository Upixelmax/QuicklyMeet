const mongoose = require('mongoose');

const HorarioSchema = mongoose.Schema({
    fecha: {
        type: String, // Cambia el tipo a Date
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        default: "Disponible"
    },
    fechaCreación: {
        type: Date,
        default: Date.now()
    },
    idUser: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        default: null }
});

module.exports = mongoose.model('Horario', HorarioSchema);
