const express = require("express");
const {
    crearPelicula,
    obtenerPeliculas,
    obtenerPeliculaPorId,
    buscarPelicula,
    actualizarPelicula,
    eliminarPelicula
} = require("../controllers/peliculaController");
const verificarToken = require("../middleware/authMiddleware")

const router = express.Router();


router.post("/",verificarToken, crearPelicula);

router.get("/", obtenerPeliculas)
router.get("/search", buscarPelicula)
router.get("/:id", obtenerPeliculaPorId);


router.put("/:id", verificarToken, actualizarPelicula);
router.delete("/:id", verificarToken , eliminarPelicula);

module.exports = router;