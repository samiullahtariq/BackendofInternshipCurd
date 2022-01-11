
const Class = require("../models/Class")

const AllClass = async  function(){
    try{
           const allclass = await Class.find().populate("student")
           return  allclass
    }catch(err){
        console.log(err)
    }
   
}

const AddClass = async  function(  users){
    try{
        const addclass = await new Class(users).save()
        return addclass
    }catch(err){
        console.log(err)
    }
}

const RemoveClass = async  function(id){
    try{
        const findClass = await Class.findByIdAndDelete(id)
        return findClass
    }catch(err){
        console.log(err)
    }
   
}

const UpdateClass = async  function(user , newClass , newDate){
    try{
       const updateC = await Class.findOneAndUpdate(user,newClass , newDate)

    return updateC
    }catch(err){
        res.status(500).json(err)
    }
   
}

const QueryFindClass = async  function(user){
    try{
        const findClass = await Class.findOne(user)
        return findClass
    }catch(err){
        console.log(err)
    }

}

module.exports ={AllClass , AddClass , RemoveClass , UpdateClass , QueryFindClass }