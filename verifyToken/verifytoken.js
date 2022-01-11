
const jwt = require('jsonwebtoken')

const verifyToken = (req ,res, next)=>{

        //getting the token
    const authheader = req.headers.token;

    if(authheader){
        
        //spliting the token 

        let token = authheader

        //verifying the token

        jwt.verify(token , process.env.JWT_KEY , (err , user)=>{
            if(err) res.status(403).json("Token is not valid")
         
            req.user = user;
            next()

        })
    }else{
        res.status(401).json("You are not authenticated")
    }

}

//Now we will verify token and authenticate with its id as well

const verifyTokenAuthenticationStd  = (req ,res , next)=>{
    verifyToken(req, res , ()=>{
        if(req.user.id === req.params.id){
            next()
        }else{
            res.json("You are not allowed to do that").status(400)
        }
    })
}

const verifyTokenAuthenticationClass  = (req ,res , next)=>{
    verifyToken(req, res , ()=>{
        if(req.user._id === req.params.id){
            next()
        }else{
            res.json("You are not allowed to do that").status(400)
        }
    })
}


module.exports = {verifyToken ,verifyTokenAuthenticationClass ,verifyTokenAuthenticationStd }