const express = require("express");
const {
    crearFuncion,
    obtenerFuncion,
    obtenerFunciones
} = require("../controllers/funcionController");



const router = express.Router();

router.post("/", crearFuncion);
router.get("/funcion", obtenerFuncion)
router.get("/", obtenerFunciones)


module.exports = router;