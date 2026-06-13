const mongoose = require('mongoose')

const funcionSchema = new mongoose.Schema({
pelicula: {type: mongoose.Schema.Types.ObjectId,
           ref: 'Pelicula',
           required : true } , 
           fecha : { type: Date , required : true},
           sala : { type: Number , required:true},
           capacidad : {type: Number ,required: true},
           precio :{type: Number , required : true}


})

module.exports = mongoose.model("Funcion" , funcionSchema)