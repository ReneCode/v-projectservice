const WebServer = require('./web-server');
const database = require('./database/database');


const OPTIONS = {
  port: process.env.PORT || 3001
};

const webServer = new WebServer(OPTIONS);
webServer.createServer();

const mongoConnectionString = process.env.DV_MONGO_URI;

database.connect(mongoConnectionString)
  .then(() => {
    return webServer.listen()
  })
  .then(() => {
    console.log("server listen on port:", OPTIONS.port);
  })
  .catch((err) => {
    console.log("can not start to v-project service:", err);
  });


