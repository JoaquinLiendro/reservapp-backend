const mongoose = required('mongoose');

const peliculaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    genero: { type: String, required: true },
    duracion: { type: Number, required: true },
    clasificacion: { type: String, required: true },
    descripcion: { type: String },
    fechaEstreno: { type: Date },
    director: { type: String, required: true },
    idioma: { type: String, required: true } },
    {timestamps: true}); //cuando se creo y cuando se actualio


export default mongoose.model('Pelicula', peliculaSchema);