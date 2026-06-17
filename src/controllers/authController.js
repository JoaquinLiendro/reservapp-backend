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


     const token = generarToken(usuario) 
     const refreshToken = generarRefresh(usuario)

     res.cookie("refreshToken" , refreshToken ,{
        httpOnly : true,
        maxAge: 100*60*60*24*7 // 7 dias en miliseg
     })



    res.status(200).json({
      mensaje: "Login exitoso",
      token
    });

  } catch (error) {
    
    res.status(500).json({
      
      mensaje: error.message,
    
    });
  }
};

const generarToken = (usuario) =>{
  const datosEncriptados = 
      {
        id: usuario._id,
        email: usuario.email,
        rol: usuario.rol
      }

   const JWY_KEY =   process.env.JWT_SECRET

     return jwt.sign(
  datosEncriptados,
   JWY_KEY,
   {  expiresIn: "1d"  }
)

}


const generarRefresh =(usuario) => {


  return jwt.sign(
    {id: usuario._id},
    process.env.JWT_SECRET,
    {expiresIn: "7d"}
  )
}

const refreshToken = (req , res) =>{
const tokenn = req.cookies.refreshToken

if(!tokenn){
  return res.status(401).json ({ error: " No hay refresh token"})
}

try{

  const decodificado = jwt.verify(tokenn , process.env.JWT_SECRET_REFRESH)

  const nuevoAccesToken = jwt.sign(
  { id:decodificado.id},
    process.env.JWT_SECRET,
    { expiresIn: '1h'}
  )

  res.json({token: nuevoAccesToken})

}catch(error){
res.status(500).json({  error: "hubo un error" });
}

}




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
