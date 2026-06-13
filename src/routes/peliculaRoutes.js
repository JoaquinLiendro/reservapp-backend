const express = require("express");
const {
    crearPelicula,
    obtenerPeliculas,
    obtenerPeliculaPorId,
    actualizarPelicula,
    eliminarPelicula
} = require("../controllers/peliculaController");

const router = express.Router();


router.post("/", crearPelicula);

router.get("/", obtenerPeliculas);
router.get("/:id", obtenerPeliculaPorId);

router.put("/:id", actualizarPelicula);
router.delete("/:id", eliminarPelicula);

module.exports = router;