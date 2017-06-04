var WebServer = require('../src/web-server');
let database = require('../src/database/database');

// create Server
const options = { mode: "testing" };
let webServer = new WebServer(options);

const server = webServer.createServer();
const PORT = webServer.getPort();

let api = undefined;

/*
  start & stop the backend server for the mocha tests

  before() and after() are used before and after *ALL* test.spec.files
*/

before('start server', (done) => {
  // console.log("start testing backend server")
  api = server.listen(PORT, () => {
    database.connect().then(() => {
      done();

    })
  });
});

after('close server', (done) => {
  // console.log("stop testing backend server")
  api.close(() => {
    done();
  });
})
