const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  
  const AuthHeader = req.header("Authorization");

  if (!AuthHeader) {
    return res.status(401).json({ mensaje: "Acceso denegado, error de token",
    });
  }

  const token  = AuthHeader.split(" ")[1]

  try {
    console.log("TOKEN:", token);
    console.log("SECRET:", process.env.JWT_SECRET);

    const verificado = jwt.verify(token, process.env.JWT_SECRET);

      console.log("verificado:" , verificado)

    req.usuario = verificado;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      mensaje: "Token inválido o expirado",
    });
  }
};






module.exports = verificarToken;
