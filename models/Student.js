
const mongoose = require('mongoose')


let studentSchema = new mongoose.Schema({

    name :{ type : String,required : true },
    email :{type : String , required : true},
    password :{type : String , required : true},
    dateofbirth : {type : Date , required : true},
    facebookProfile : {type : String , required : true}

})

module.exports= Student = mongoose.model("Student" , studentSchema)

