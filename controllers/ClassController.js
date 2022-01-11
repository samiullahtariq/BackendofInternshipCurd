const { UpdateClass, QueryFindClass, AddClass, RemoveClass, AllClass } = require("../services/ClassServices")
const Class = require("../models/Class")

module.exports.Add_Update_Class = async(req ,res)=>{
    try{
      
     const classFields = {};
        
     classFields.student = req.user.id
     console.log(classFields.student + "it is id of std")

     if(req.body.subject) classFields.subject = req.body.subject

     if(req.body.teacherName) classFields.teacherName = req.body.teacherName

     if(req.body.duration) classFields.duration = req.body.duration

     if(req.body.time) classFields.time = req.body.time

     //find one and we will update it later
      const classProfile = await QueryFindClass({user : req.user.id})

    //   //Update
     if(classProfile){

         const newClass ={$set : classFields }
         const newData = {new : true}
         const user = req.user.id
      const updatedClass = await  UpdateClass(user , newClass , newData)


         res.json(updatedClass).status(200)
         console.log(updatedClass + "It is updated Data")

     }else{
         const StdIdData = classFields
      const data= await QueryFindClass({subject : classFields.subject})
      console.log(data + "Checking the data")
        if (data) {
            errors.subject = 'That subject already exists';
            res.status(400).json(errors);
          }

        //Here we will save the Created Class 
        const saveClassData = await AddClass(StdIdData)
        console.log(saveClassData)
       
        res.json({message : saveClassData}).status(200) 
     }


    }catch(err){
        res.json(err).status(400)
    }
}


module.exports.Delete_Class = async(req ,res)=>{
    try{

        const user = req.params.id
        const findDataofClass = await RemoveClass(user)
        console.log(findDataofClass)

        if(findDataofClass){
            const id = req.student.id
            const DeleteData = await  RemoveStudent(id)
            console.log(DeleteData)
            res.json({message : DeleteData ,success : true})
        }

}catch(err){
   res.json(err).status(400)
}
}



module.exports.Get_Class = async(req ,res)=>{
    try{
       

         const FindAll = await AllClass()

         console.log(FindAll)
        
         if(!FindAll){res.json('There are no profiles').status(404)}
           else{
              res.json(FindAll).status(200)
           }

  }catch(err){
      res.json(err).status(400)
  }
}

module.exports.Get_Single_Class = async(req ,res)=>{
    try{
        const classdata = await QueryFindClass({user : req.user.id})
         .populate("student")
        if(classdata){
            res.json(classdata).status(200)
            
          }
    }catch(err){
        res.status(404).json({message : "No profile exist of this id"});
    }
}