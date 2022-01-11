const Student = require("../models/Student")
const CryptoJS = require('crypto-js')
const jwt = require("jsonwebtoken")
const {AddStudent,RemoveStudent,UpdateStudentId,QueryFindStudent} = require("../services/StudentServices")

module.exports.register_Student = async(req ,res)=>{
    try{
        //Check if user exists
      //  without service
       const exist_Std = await QueryFindStudent({email : req.body.email})

        if(exist_Std){
            res.json({message : "User Already Exists"})
        }

        const student = {
            name : req.body.name,
            email : req.body.email,
            password : CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
            dateofbirth : req.body.dateofbirth,
            facebookProfile :  req.body.facebookProfile
        }
         const add_Std = await AddStudent(student)
         //saving the user

         const saved = await add_Std.save()

         res.json({message : saved}).status(201)


    }catch(err){
        res.json(err).status(400)
    }
}


module.exports.Student_login = async(req, res)=>{
    try{

        //Check if user exists
        const user = await QueryFindStudent({email : req.body.email})

        if(!user){
            res.json({message : "User do not exist"}).status(400)
        }else{
    
            const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)

            //Checking the password
            hashedPass !== req.body.password && res.json({message : "invalid credentials"}).status(400)
            //Generating a jwtAuth Token

          const accessToken=  jwt.sign({ id : user._id} , process.env.JWT_KEY,{
                expiresIn : "3d"
            })

          const {password , ...others } = user._doc
        
          res.status(200).json({...others , accessToken})

        }

    }catch(err){
        res.json(err).status(400)
    }
}


module.exports.Delete_Std = async(req ,res)=>{
    try{
       const id = req.params.id
        const del_By_Id =await RemoveStudent(id)

        if (!del_By_Id){
            res.json("No student exist of this id")
        }else{
            res.json({message : "Student  Deleted"}).status(200)
        }

    }catch(err){
                res.json(err).status(400)
    }
}


module.exports.Update_Std = async(req ,res)=>{
    try{
      
        const newUser = {$set : req.body ,new : true}
        const update_By_Id =await UpdateStudentId(req.params.id , newUser)

         res.json(update_By_Id).status(200)
         
    }catch(err){
                res.json(err).status(400)
    }
}