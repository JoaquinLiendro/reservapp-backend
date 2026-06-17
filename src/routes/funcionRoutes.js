const express = require("express");
const {
    crearFuncion,
    obtenerFunciones,
    obtenerFuncionPorId,
    buscarFuncionPorPelicula,
    actualizarFuncion,
    eliminarFuncion
} = require("../controllers/funcionController");
const verificarToken = require("../middleware/authMiddleware")

const router = express.Router();


router.post("/", verificarToken , crearFuncion);


router.get("/por-titulo", buscarFuncionPorPelicula);
router.get("/:id", verificarToken , obtenerFuncionPorId);
router.get("/", obtenerFunciones);


router.put("/:id", verificarToken , actualizarFuncion);

router.delete("/:id", verificarToken , eliminarFuncion);

module.exports = router;