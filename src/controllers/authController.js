const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    if (usuario.password !== password) {
      return res.status(401).json({
        mensaje: "password incorrecta",
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        email: usuario.email,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.status(200).json({
      mensaje: "Login exitoso",
      token,
    });

  } catch (error) {
    
    res.status(500).json({
      
      mensaje: error.message,
    
    });
  }
};

const perfil = async (req, res) => {

    res.json({
        mensaje: "Acceso autorizado",
        usuario: req.usuario
    });

    };

module.exports = {
  login,
  perfil,
};
