const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");


const server = http.createServer(app);
console.log(config.PORT);
server.listen(config.PORT, () => {
  logger.info(`Servidor listo en el puerto : ${config.PORT}`);
});

server.on("error", (error) =>
  logger.error("Hubo un error en el servidor :" + error)
);
