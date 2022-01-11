const express = require('express')
const dotenv = require("dotenv")
const Conn = require('./connection/db')
const router = require('./routes/StudentRoute')
const ClassRouter = require("./routes/ClassRoute")


dotenv.config()

Conn()

const app = express()
//express middleware
app.use(express.json())


app.use("/api/v1/students" , router)
app.use("/api/v1/classes" , ClassRouter)

const port = process.env.PORT || 8000

app.listen(port , ()=>{
    console.log(`App is running on port ${port}`)
})