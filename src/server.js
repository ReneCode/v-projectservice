var express = require('express');
var http = require('http');
var logger = require('morgan');
var cors = require('cors');

var jwt = require('express-jwt');

var routeHome = require('./route/home');
var routeApi = require('./route/api');

var app = express();

const AUTH0_SECRET = process.env.AUTH0_SECRET;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;

var authCheck = jwt({
	secret: new Buffer(AUTH0_SECRET),
	audience: AUTH0_AUDIENCE
})

app.use(cors());
// app.use(jwtCheck);

app.use(logger('dev'));

app.use("/", routeHome);
app.use("/api/v1/", authCheck, routeApi);

let server = http.createServer(app);

module.exports = server;
