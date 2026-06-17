const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs")

const crearUsuario = async (req, res) => {
  const {nombre , email , password , edad} = req.body;
 
  if(!nombre ||!email || !password || !edad){
    return res.status(400).json({ error : "Faltan datos debe contener : nombre , email , password y edad"})
  }
  
  const hashedPassword = await bcrypt.hash(password,10)
  
  const nuevoUsuario = {
    nombre : nombre ,
    email : email,
    password: hashedPassword,
    edad:edad
  }
  
  try {
    const newUsuario = await Usuario.create(nuevoUsuario)
    
    res.status(201).json(newUsuario)

  } catch (error) {
   
    console.log(error)
    res.status(500).json({ error:  " error al crear Usuario"});
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
