const mongoose = require("mongoose")
 

let classSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      },
    subject : {type : String , required : true},
    teacherName : {type : String , required : true},
    duration :{type : String , required : true }, 
    time :{type : String , default: (new Date()).getTime()}

})

module.exports= Class = mongoose.model("Class" , classSchema)

