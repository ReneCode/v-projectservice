var express = require('express');
var logger = require('morgan');
var cors = require('cors');

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var routeHome = require('./route/home');
var routeApi = require('./route/api');

var app = express();

/*
const AUDIENCE = 'https://epl-projectservice.azurewebsites.net/';

const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://relang.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: AUDIENCE,
    issuer: "https://relang.eu.auth0.com/",
    algorithms: ['RS256']
});
*/

const AUTH0_SECRET = "HUebW9uSkHZFR1tgGzDAkUSwkSSHa1PVaOTDAkE9vwlDdbNzMS6enwU3RdwCB-8F";
const AUTH0_AUDIENCE =     "bJGXNSwOrFznt6ZYey6xDOsSb2IOGw6K";
    // "uQ5ASdbVcuUaRjTSaRwKKMK40gjl44fp",

var authCheck = jwt({
	secret: new Buffer(AUTH0_SECRET),
	audience: AUTH0_AUDIENCE
})

app.use(cors());
// app.use(jwtCheck);


app.use(logger('dev'));

app.use("/", routeHome);

app.use("/api/v1/", authCheck, routeApi);





var port = process.env.PORT || 3000;

var server = app.listen(port, () => {
	console.log("epl-projectservice started on port:", port);
})