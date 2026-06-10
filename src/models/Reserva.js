const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
    
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    funcionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Funcion",
        required: true
    },

    cantidadEntradas: {
        type: Number,
        required: true,
        min: 1
    },

    fechaReserva: {
        type: Date,
        default: Date.now
    },

    estado: {
        type: String,
        enum: ["activa", "cancelada"],
        default: "activa"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Reserva", reservaSchema);