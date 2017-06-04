
var axios = require('axios');


var options = {
  method: 'POST',
  url: 'https://relang.eu.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  data:
  {
    grant_type: 'client_credentials',
    client_id: '0BIIvj15rAVs5zyjyBr2rAPNICmU6rZ1',
    client_secret: 'PwYRjMrimEV5RV3DRntryHGcuATHrgMILgd3VQBzSb_orT54BbHBqL6ZlMzO_MMz',
    audience: 'https://epl-projectservice.azurewebsites.net/'
  },
  json: true
};


function getAuthToken() {
  return new Promise((resolve, reject) => {
    axios(options).then(
      (response) => {
        resolve(response.data.access_token);
      })
      .catch((err) => {
        console.log("error:", err);
        reject(err);
      });
  })
}



module.exports = getAuthToken;