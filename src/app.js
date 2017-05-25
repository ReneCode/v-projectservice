var express = require('express');
var logger = require('morgan');
var cors = require('cors');

var routeHome = require('./route/home');
var routeApi = require('./route/api');

var app = express();

app.use(cors());
app.use(logger('dev'));

app.use("/", routeHome);

app.use("/api/v1/", routeApi);





var port = process.env.PORT || 8080;

var server = app.listen(port, () => {
	console.log("epl-projectservice started on port:", port);
})