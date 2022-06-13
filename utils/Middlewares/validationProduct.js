
const logger = require('../logger')

const validationProduct = (schema) => async(req,res,next)=>{

const body = req.body;

try {
    await schema.validate(body)
    logger.info('Envio exitoso')
    next()
    
} catch (error) {
   const {id} = req.params
    const errorName = error.name
    const errorDescription = error.errors
   
    return res.render('errorProduct.ejs',{errorDescription,errorName,id})
}

}

module.exports = validationProduct;