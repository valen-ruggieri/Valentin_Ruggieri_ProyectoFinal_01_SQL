
const logger = require('../logger')
const validation = (schema) => async(req,res,next)=>{

const body = req.body;
try {
    await schema.validate(body)
    logger.info('Ingreso exitoso')
    next()
    
} catch (error) {
    logger.info(error)
    const errorName = error.name
    const errorDescription = error.errors
    return res.render('errorUser.ejs',{errorName,errorDescription})
}

}

module.exports = validation;