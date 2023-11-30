const mongoose = require('mongoose');

const HorarioSchema = mongoose.Schema({
    fecha: {
        type: Date, // Cambia el tipo a Date
        required: true
    },
    hora: {
        type: String,
        validate: {
            validator: function (v) {
                // Agrega una validación personalizada para el formato de hora (HH:mm)
                return /^([01]\d|2[0-3]):[0-5]\d$/.test(v);
            },
            message: props => `${props.value} no es un formato de hora válido (HH:mm)`
        },
        required: true
    },
    estado: {
        type: String,
        default: "Disponible"
    },
    fechaCreación: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Horario', HorarioSchema);
