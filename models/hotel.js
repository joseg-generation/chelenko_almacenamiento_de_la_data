const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

const hotelSchema= new mongoose.Schema({
    nombre: {
        type:String,
        required: true,
        minLength:3
    },
    direccion: String,
    categoria:String,

})
hotelSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject.idtoString()
        delete returnedObject._id
        delete returnedObject._v
    }

})

module.exports= mongoose.model('Hotel',hotelSchema)