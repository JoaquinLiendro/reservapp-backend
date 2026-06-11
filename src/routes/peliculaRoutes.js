const express = require("express");
const {
    crearPelicula,
    obtenerPeliculas,
    obtenerPeliculaPorId,
    actualizarPelicula,
    eliminarPelicula
} = require("../controllers/peliculaController");

const router = express.Router();

// POST - Crear película
router.post("/", crearPelicula);

// GET - Obtener todas las películas 
router.get("/", obtenerPeliculas);

// GET - Obtener película por ID
router.get("/:id", obtenerPeliculaPorId);

// PUT - Actualizar película
router.put("/:id", actualizarPelicula);

// DELETE - Eliminar película
router.delete("/:id", eliminarPelicula);

module.exports = router;