
const database = require("../firebase/firebase");
const logger = require('../utils/logger')





const userSession = async(email,password)=>{
    const user = await database.collection("Users").where("password",'==',password).where("email","==",email).get();
 const userId = user.docs.map((user) => ({
     id:user.id,
     name: user.data().name,
     password: user.data().password, 
     userType: user.data().userType,
     carrito: user.data().carrito}))
    logger.info(userId)

 
   }

   module.exports= userSession