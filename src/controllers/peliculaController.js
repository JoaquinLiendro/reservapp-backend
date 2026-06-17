const Pelicula = require("../models/Pelicula");

 const crearPelicula = async (req, res) => {
    const { titulo, genero, director, clasificacion, duracion, idioma  } = req.body;
    if (!titulo || !genero || !director || !duracion ){
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }  
    const nuevaPelicula = {
        titulo: titulo,
        genero: genero,
        director: director,
        duracion: duracion,
        clasificacion:clasificacion,
        idioma: idioma

    };
    try {
        const peliculaCreada = await Pelicula.create(nuevaPelicula)
        res.status(201).json(peliculaCreada);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la pelicula'});
    }
}


const obtenerPeliculas = async (req, res) => {
    try {
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
};

 
 const buscarPelicula = async (req, res) => {
     const { titulo , genero} = req.query;

    const filtro = {};


    try {  
        
        if (titulo) {
            filtro.titulo = {  $regex: `^${titulo}`,  $options: 'i'  }
        }
        if (genero) {
            filtro.genero = { $regex: `^${genero}`, $options: 'i'   }
        }
            
            const pelicula = await Pelicula.find(filtro);
            
            res.json(pelicula);
       
        } catch (error) {
            res.status(500).json({ error: 'Error al buscar la pelicula' });
        }  
}

  const obtenerPeliculaPorId = async (req,res) => {
try {
        console.log("ID recibido:", req.params.id); // ← Agrega esto para debuggear
        
        if (!req.params.id) {
            return res.status(400).json({ error: "ID no proporcionado" });
        }

        const pelicula = await Pelicula.findById(req.params.id);

        if (!pelicula) {
            return res.status(404).json({
                mensaje: "Película no encontrada",
            });
        }

        res.status(200).json(pelicula);
    } catch (error) {
        res.status(500).json({
            mensaje: error.message,
        });
    }
  }





  const actualizarPelicula = async (req,res) => {

    try{
        const pelicula = await Pelicula.findByIdAndUpdate(
            req.params.id,
            req.body, { new : true}
        )

         if(!pelicula){
            return res.status(404).json({error: "Pelicula no  existe"})
         } 
         res.status(500).json(pelicula); 

    }catch(error){
        res.status(500).json({error: error.message})
    }
  }

const eliminarPelicula = async (req , res) =>{

    try{
         const pelicula = await Pelicula.findByIdAndDelete( req.params.id)

            if(!pelicula){
                return res.status(404).json({error:'La pelicula no se encontro'})
            } 

            res.status(200).json({error:'Pelicula eliminada correctamente'})
          
    } catch(error){
        res.status(500).json({error: error.message})
    
}


}



module.exports = {
  crearPelicula,
  obtenerPeliculas,
  buscarPelicula,
  obtenerPeliculaPorId,
  actualizarPelicula,
  eliminarPelicula
  

};
