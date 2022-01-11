const express = require("express")
const {Get_Single_Class, Add_Update_Class, Delete_Class, Get_Class } = require("../controllers/ClassController")
const { Class_Validation } = require("../validation/ClassValidation")
const router = express.Router()
const { verifyTokenAuthenticationClass} = require("../verifyToken/verifytoken")


router.post("/" ,Class_Validation,verifyTokenAuthenticationClass , Add_Update_Class)
router.put("/update" ,Class_Validation, verifyTokenAuthenticationClass , Add_Update_Class)
router.delete("/delete/:id" ,verifyTokenAuthenticationClass ,Delete_Class)
router.get("/get" , verifyTokenAuthenticationClass , Get_Class)
router.get("/getSingle" , verifyTokenAuthenticationClass , Get_Single_Class)


module.exports = router