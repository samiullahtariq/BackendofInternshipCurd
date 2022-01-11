const {body , validationResult} = require('express-validator')


module.exports.Class_Validation = [
    body('subject').isLength({min : 3}),
    body('teacherName', 'Your Teacher name must be at least 3 characters').isLength({min: 3 }),

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