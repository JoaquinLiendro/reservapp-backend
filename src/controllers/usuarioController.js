const Usuario = require("../models/Usuario");

const crearUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);

    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();

    res.status(200).json(usuarios);
  } catch (error) {

    res.status(500).json({
      mensaje: error.message,
    });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      {new: true,});

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "Usuario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};
