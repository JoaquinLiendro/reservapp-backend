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

module.exports = {
  crearPelicula,
  obtenerPeliculas
};
