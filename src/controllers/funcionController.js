const Funcion = require("../models/Funcion");
const Pelicula = require("../models/Pelicula")
const mongoose = require('mongoose');

const crearFuncion = async (req, res) => {
    const { pelicula, fecha, sala, capacidad, precio } = req.body;

    if (!pelicula || !fecha || sala === undefined || capacidad === undefined || precio === undefined) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevaFuncion = {
        pelicula: pelicula,
        fecha: fecha,
        sala: sala,
        capacidad: capacidad,
        precio: precio
    };
  
    try {
        const funcionCreada = await Funcion.create(nuevaFuncion);
        res.status(201).json(funcionCreada);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la función', detalle: error.message });
    }
};

const obtenerFunciones = async (req, res) => {
    try {
        const funciones = await Funcion.find().populate("pelicula");
        res.json(funciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las funciones' });
    }
};

const obtenerFuncionPorId = async (req, res) => {
    try {
        const funcion = await Funcion.findById(req.params.id).populate("pelicula");  // ← Agregué .populate()

        if (!funcion) {
            return res.status(404).json({
                mensaje: "Función no encontrada",
            });
        }

        res.status(200).json(funcion);
    } catch (error) {
        res.status(500).json({
            mensaje: error.message,
        });
    }
};

const buscarFuncionPorPelicula = async (req, res) => {
   const { titulo } = req.query;

    if (!titulo) {
        return res.status(400).json({ error: 'Parámetro titulo requerido' });
    }

    try {
        console.log("Título recibido:", titulo);

        // Busca la película por título
        const pelicula = await Pelicula.findOne({ 
            titulo: { $regex: `^${titulo}`, $options: "i" } 
        });

        console.log("Película encontrada:", pelicula);

        if (!pelicula) {
            return res.status(404).json({
                error: "Película no encontrada"
            });
        }

        // Busca las funciones con el ID de la película
        const funciones = await Funcion.find({ 
            pelicula: pelicula._id 
        }).populate("pelicula");

        console.log("Funciones encontradas:", funciones);

        if (funciones.length === 0) {
            return res.status(404).json({ 
                error: 'No hay funciones para esa película' 
            });
        }

        res.json(funciones);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            error: 'Error al buscar funciones' 
        });
    }
};

const actualizarFuncion = async (req, res) => {
    try {
        const funcion = await Funcion.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        ).populate("pelicula");  // ← Agregué .populate()

        if (!funcion) {
            return res.status(404).json({
                mensaje: "Función no encontrada",
            });
        }

        res.status(200).json(funcion);
    } catch (error) {
        res.status(500).json({
            mensaje: error.message,
        });
    }
};

const eliminarFuncion = async (req, res) => {
    try {
        const funcion = await Funcion.findByIdAndDelete(req.params.id);

        if (!funcion) {
            return res.status(404).json({
                mensaje: "Función no encontrada",
            });
        }

        res.status(200).json({
            mensaje: "Función eliminada correctamente",  // ← Cambié de "error" a "mensaje"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: error.message,
        });
    }
};


module.exports = {
    crearFuncion,
    obtenerFunciones,
    obtenerFuncionPorId,
    buscarFuncionPorPelicula,
    actualizarFuncion,
    eliminarFuncion,
    
};