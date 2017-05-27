var express = require('express');
var logger = require('morgan');
var cors = require('cors');

var jwt = require('express-jwt');
// var jwks = require('jwks-rsa');

var routeHome = require('./route/home');
var routeApi = require('./route/api');

var app = express();

/*
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://relang.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://epl-projectservice.azurewebsites.net/',
    issuer: "https://relang.eu.auth0.com/",
    algorithms: ['RS256']
});
*/

const AUTH0_SECRET = "9ZAwSHVC_XmutlSjAvEEM_vNV-v0mPyy0YmlJO9Z27ulWKZ3_qM6MBeK6oQaBqli";
const AUTH0_AUDIENCE = "uQ5ASdbVcuUaRjTSaRwKKMK40gjl44fp";

var authCheck = jwt({
	secret: new Buffer(AUTH0_SECRET),
	audience: AUTH0_AUDIENCE
})

app.use(cors());
// app.use(jwtCheck);


app.use(logger('dev'));

app.use("/", routeHome);

app.use("/api/v1/", /*authCheck, */ routeApi);





var port = process.env.PORT || 3000;

var server = app.listen(port, () => {
	console.log("epl-projectservice started on port:", port);
})