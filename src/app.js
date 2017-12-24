const WebServer = require('./web-server');
const database = require('./database/database');

require('dotenv').config()

const OPTIONS = {
  port: process.env.PORT || 3001,
  authorize: false
};

const webServer = new WebServer(OPTIONS);
webServer.createServer();

const mongoConnectionString = process.env.DV_MONGO_URI;
if (!mongoConnectionString) {
  throw Error("connection string missing");
}

database.connect(mongoConnectionString)
  .then(() => {
    return webServer.listen()
  })
  .then(() => {
    console.log("server listen on port:", OPTIONS.port);
  })
  .catch((err) => {
    console.log("can not start v-project service:", err);
  });


