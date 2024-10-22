const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

console.log('conectando a',url)
mongoose.connect(url)
.then(result =>{
    console.log('se conccto con exito a mongoDB')
})
.catch(error =>{
    console.log('ocurrio un error', error.message)
})

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