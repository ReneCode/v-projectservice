'use strict'

var express = require('express');
var http = require('http');
var logger = require('morgan');
var cors = require('cors');

var jwt = require('express-jwt');

var routeHome = require('./route/home');
var routeApi = require('./route/api');

class WebServer {

	constructor(config = {}) {
		this.testing = false;
		this.port = process.env.PORT || 3000;

		if (config.mode === "testing") {
			this.testing = true;
		}
		if (config.port) {
			this.port = config.port;
		}
	}

	getPort() {
		return this.port;
	}

	createServer() {

		var app = express();

		const AUTH0_SECRET = process.env.AUTH0_SECRET;
		const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;

		var authCheck = jwt({
			secret: new Buffer(AUTH0_SECRET),
			audience: AUTH0_AUDIENCE
		})

		app.use(cors());

		if (!this.testing) {
			app.use(logger('dev'));
		}

		app.use("/", routeHome);

		if (!this.testing) {
			app.use(authCheck);
		}
		app.use("/api/v1/", routeApi);

		let server = http.createServer(app);

		server.on('close', () => {
			// console.log("server closed");
		})

		return server;
	}
}

module.exports = WebServer;
