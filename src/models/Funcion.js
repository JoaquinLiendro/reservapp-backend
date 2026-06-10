const mongoose = required('mongoose');

const funcionSchema = new mongoose.Schema({
pelicula: {type: moongose.Schema.Types.ObjectId,
           ref: 'Pelicula',
           required : true } , 
           fecha : { type: Date , required : true},
           sala : { type: Number , required:true},
           capacidad : {type: Number ,requred: true},
           precio :{tupe: Number , required : true}


})

export default mongoose.model('Funcion', funcionSchema);