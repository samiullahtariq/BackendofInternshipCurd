const express = require("express")
const router = express.Router()
const {register_Student, Student_login, Delete_Std, Update_Std} = require("../controllers/StudentController")
const {Std_Validation_Registeration, STd_Validation_Login, STd_Validation_Update } = require("../validation/StudentValidation")

const {verifyTokenAuthenticationStd} = require("../verifyToken/verifytoken")



router.post("/" ,Std_Validation_Registeration, register_Student)
router.post("/login",STd_Validation_Login , Student_login)
router.delete("/delete/:id",verifyTokenAuthenticationStd , Delete_Std)
router.put("/update/:id", STd_Validation_Update, verifyTokenAuthenticationStd , Update_Std)


module.exports = router