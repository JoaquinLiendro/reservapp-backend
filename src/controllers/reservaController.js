const Reserva = require("../models/Reserva");

const crearReserva = async (req, res) => {
  try {
    const reserva = await Reserva.create({
      usuarioId: req.usuario.id,
      funcionId: req.body.funcionId,
      cantidadEntradas: req.body.cantidadEntradas,
    });

    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find({
      usuarioId: req.usuario.id,
    });

    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

const obtenerReservaPorId = async (req, res) => {
  try {
    const reserva = await Reserva.findOne({
      _id: req.params.id,
      usuarioId: req.usuario.id,
    });

    if (!reserva) {
      return res.status(404).json({
        mensaje: "Reserva no encontrada",
      });
    }

    res.status(200).json(reserva);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

const actualizarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);

    if (!reserva) {
      return res.status(404).json({
        mensaje: "Reserva no encontrada",
      });
    }

    if (reserva.usuarioId.toString() !== req.usuario.id) {
      return res.status(403).json({
        mensaje: "No autorizado",
      });
    }

    const reservaActualizada = await Reserva.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json(reservaActualizada);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

const eliminarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);

    if (!reserva) {
      return res.status(404).json({
        mensaje: "Reserva no encontrada",
      });
    }

    if (reserva.usuarioId.toString() !== req.usuario.id) {
      return res.status(403).json({
        mensaje: "No autorizado",
      });
    }

    await Reserva.findByIdAndDelete(req.params.id);

    res.status(200).json({
        mensaje: "Reserva eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

module.exports = {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva,

};
