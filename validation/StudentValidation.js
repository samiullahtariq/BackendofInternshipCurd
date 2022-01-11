const {body , validationResult} = require('express-validator')


module.exports.Std_Validation_Registeration = [
    body('name').isLength({min: 5}).withMessage('Name must have more than 5 characters'),
    body('email', 'Your email is not valid').isEmail(),
    body('password', 'Your password must be at least 5 characters').isLength({min: 5}),
   //body('dateofbirth').isDate(),
    body('facebookProfile').isURL(),

    function(req ,res ,next){
            const errorValidation = validationResult(req);

            if ( !errorValidation.isEmpty() ) {
                return res.status(500).json({
                    title: 'an error occured',
                    error: errorValidation
                });
            }
            next()          
    }
]


module.exports.STd_Validation_Login=[
    body('email', 'Your email is not valid').isEmail(),
    body('password', 'Your password must be at least 5 characters').isLength({min: 5}),
    function(req ,res ,next){
        let errors = validationResult(req)
        if ( !errors.isEmpty() ) {
            return res.status(500).json({
                title: 'an error occured',
                error: errors
            });
        }
        next() 
        
    }
]

module.exports.STd_Validation_Update=[
    body('name').isLength({min: 5}).withMessage('Name must have more than 5 characters'),

    function(req ,res ,next){
        let errors = validationResult(req)
        if ( !errors.isEmpty() ) {
            return res.status(500).json({
                title: 'an error occured',
                error: errors
            });
        }
        next()      
    }
]


