const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");

const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario,

} = require("../controllers/usuarioController");

router.post("/", crearUsuario);
router.get("/", verificarToken , obtenerUsuarios)
router.get("/:id", verificarToken , obtenerUsuarioPorId);
router.put("/:id",verificarToken , actualizarUsuario);
router.delete("/:id", verificarToken , eliminarUsuario);

module.exports = router;