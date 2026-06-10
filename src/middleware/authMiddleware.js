const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      mensaje: "Acceso denegado",
    });
  }

  try {
    console.log("TOKEN:", token);
    console.log("SECRET:", process.env.JWT_SECRET);

    const verificado = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = verificado;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      mensaje: "Token inválido",
    });
  }
};

module.exports = verificarToken;
