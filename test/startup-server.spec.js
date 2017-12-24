var WebServer = require('../src/web-server');
let database = require('../src/database/database');

require('dotenv').config()

process.env.PORT = 3101

const OPTIONS = {
  port: process.env.PORT,
  authorize: false,
  logging: false
};
let API;

/*
  start & stop the backend server for the mocha tests

  before() and after() are used before and after *ALL* test.spec.files
*/

before('start server', () => {
  const mongoConnectionString = process.env.DV_MONGO_URI;
  return database.connect(mongoConnectionString)
    .then(() => {
      // create Server
      let webServer = new WebServer(OPTIONS);
      webServer.createServer();
      return webServer.listen()
    })
    .then((api) => {
      API = api;
      // console.log("TESTING: start server v-project-service on port:", OPTIONS.port)
    })
    .catch((err) => {
      console.log("Error:", err);
    });
});

after('close server', (done) => {
  // console.log("stop testing backend server")
  API.close(() => {
    done();
  });
});
