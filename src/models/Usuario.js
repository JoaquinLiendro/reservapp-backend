const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nombre: {  type: String, required: true },

    email: { type: String, required: true,  unique: true},

    password: { type: String, required: true },

    edad: { type: Number,  required: true },

    rol: { type: String,
        enum: ["usuario", "empleado", "admin"],
        default: "usuario",
    },

    historialReservas: [{ type: mongoose.Schema.Types.ObjectId,  ref: "Reserva"
    }]
});

module.exports = mongoose.model("Usuario", usuarioSchema);