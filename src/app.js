const WebServer = require('./web-server');
const database = require('./database/database');
const blobStorage = require('./blobstorage/blobstorage');

const webServer = new WebServer();
const server = webServer.createServer();
const port = webServer.getPort();

const mongoConnectionString = process.env.DV_MONGO_URI;

const storageConnectionString = process.env.DV_BLOB_STORAGE_CONNECTION_STRING;

database.connect(mongoConnectionString)
	.then(() => {
		return blobStorage.connect(storageConnectionString);
	})
	.then(() => {
		server.listen(port, () => {
			console.log("server listen on port:", port);
		});
	});


