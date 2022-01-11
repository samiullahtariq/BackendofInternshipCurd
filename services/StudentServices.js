
const Student = require("../models/Student")


const AddStudent = async  function(student){
    try{
        const addstd = await new Student(student)
        return addstd;
    }catch(err){
        console.log(err)
    }
}

const RemoveStudent = async  function(id){

    try{
        const remStd = await Student.findByIdAndDelete(id)
        return remStd;
    }catch(err){
        console.log(err)
    }
}

const UpdateStudentId = async  function(id , newUser){
    try{
           const updateStd = await Student.findByIdAndUpdate(id,newUser )

        return updateStd
    }catch(err){
        console.log(err)
    } 
}

const QueryFindStudent = async  function(email){
    try{
        const findOne = await Student.findOne(email)
        return findOne;
    }catch(err){
        console.log(err)
    }
}

module.exports ={AddStudent,RemoveStudent,UpdateStudentId,QueryFindStudent}