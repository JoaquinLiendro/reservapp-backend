const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const login = async (req, res) => {
  const { email, password } = req.body;
  
  if(!email || !password){
    res.status(400).json( {error: "Se requiere email y contrasena"})
  }
  
  
  try {

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({  error: "Usuario no encontrado", });
    }

    const compararPassword = await bcrypt.compare(password , usuario.password)
      console.log(usuario)


    if (!compararPassword) {
    
      return res.status(401).json({    error: " usuario o contraseña incorrecta"  });
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

     try {
        res.status(200).json({
            mensaje: "Acceso autorizado",
            usuario: req.usuario
        });
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }

    };

module.exports = {
  login,
  perfil,
};
