const WebServer = require('./web-server');
const database = require('./database/database');

const webServer = new WebServer();
const server = webServer.createServer();
const port = webServer.getPort();

database.connect().then(() => {

	server.listen(port, () => {
		console.log("server listen on port:", port);
	})
});

