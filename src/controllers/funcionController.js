const Funcion = require("../models/Funcion");



const crearFuncion = async (req, res) => {
 const { pelicula, fecha, sala, capacidad, precio } = req.body;

    if (!pelicula || !fecha || !sala || !capacidad || !precio) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevaFuncion = {
          pelicula :pelicula ,
         fecha :fecha,
         sala :sala,
         capacidad :capacidad,
         precio: precio
     };
  
     try {


        const funcionCreada = await Funcion.create(nuevaFuncion);

        res.status(201).json(funcionCreada);

    } catch (error) {

        res.status(500).json({ error: 'Error al crear la función' });

    }

}

const obtenerFunciones = async (req,res)=>{

    try {

        const funciones = await Funcion.find(); //esto me trae todos los usuarios de la base de datos
        res.json(funciones);
    }
        catch (error) {
        res.status(500).json({ error: 'Error al obtener las funciones' });
}
}

const obtenerFuncion = async (req, rest) => {

     const { pelicula} = req.query;
    
           const filtro = {}
    
        try {  
            
                filtro.pelicula = {  $regex: `^${pelicula}`,  $options: 'i'  }
            
                
                const pelicula = await Pelicula.find(filtro);
                
                res.json(pelicula);
           
            } catch (error) {
                res.status(500).json({ error: 'Error al buscar la pelicula' });
            }  

}


module.exports = {
  crearFuncion,
  obtenerFuncion,
  obtenerFunciones
};