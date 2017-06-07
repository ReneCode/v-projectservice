var WebServer = require('../src/web-server');
let database = require('../src/database/database');
let blobStorage = require('../src/blobstorage/blobstorage');

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

  const mongoConnectionString = process.env.DV_MONGO_URI;
  const storageConnectionString = process.env.DV_BLOB_STORAGE_CONNECTION_STRING;
  database.connect(mongoConnectionString)
    .then(() => {
      return blobStorage.connect(storageConnectionString);
    })
    .then(() => {
      api = server.listen(PORT, () => {
        done();
      });
    });
});

after('close server', (done) => {
  // console.log("stop testing backend server")
  api.close(() => {
    done();
  });
});
