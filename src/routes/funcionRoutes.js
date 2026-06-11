const express = require("express");
const {
    crearFuncion,
    obtenerFunciones,
    obtenerFuncionPorId,
    obtenerFuncionPorPelicula,
    actualizarFuncion,
    eliminarFuncion
} = require("../controllers/funcionController");

const router = express.Router();


router.post("/", crearFuncion);


router.get("/", obtenerFunciones);
router.get("/pelicula", obtenerFuncionPorPelicula);
router.get("/:id", obtenerFuncionPorId);


router.put("/:id", actualizarFuncion);

router.delete("/:id", eliminarFuncion);

module.exports = router;