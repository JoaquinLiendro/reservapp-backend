const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");

const {
    crearReserva,
    obtenerReservas,
    obtenerReservaPorId,
    actualizarReserva,
    eliminarReserva

} = require("../controllers/reservaController");

router.post("/", verificarToken, crearReserva);
router.get("/", verificarToken, obtenerReservas);
router.get("/:id", verificarToken, obtenerReservaPorId);
router.put("/:id", verificarToken, actualizarReserva);
router.delete("/:id", verificarToken, eliminarReserva);

module.exports = router;