const express = require("express");
const {
    crearPelicula,
    obtenerPeliculas
} = require("../controllers/peliculaController");




const router = express.Router();

router.post("/", crearPelicula);
router.get("/", obtenerPeliculas)


module.exports = router;