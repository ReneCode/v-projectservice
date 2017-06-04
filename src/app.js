var server = require('./server');


var port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log("server listen on port:", port);
})

