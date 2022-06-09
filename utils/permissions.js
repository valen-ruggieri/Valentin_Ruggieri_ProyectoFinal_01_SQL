
const logger = require("./logger");



const userPermissionsAdmin = (permissionsExample) => {
//   logger.info("validando permiso de administrador");
//   logger.info('permiso actual: '+permissionsExample);
// logger.info(permissionsExample === "administrador")
  return permissionsExample === "administrador";
  
};
const userPermissionsClient = (permissionsExample) => {
  // logger.info("validando permiso de cliente");
  // logger.info('permiso actual: '+permissionsExample);
  // logger.info(permissionsExample === "cliente")

  return permissionsExample === "cliente";
};

module.exports = { userPermissionsAdmin, userPermissionsClient };
