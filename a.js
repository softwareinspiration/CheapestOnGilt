var request = require('request')

function bobby(){

  console.log('hey');
}

bobby();

var apiKey = "e0f5b85f64d239a5945fede8a95a3ddce8d6e952cef546b371b3b7b3ca213468";
request.get({
url: 'https://api.gilt.com/v1/sales/active.json',
headers: {
        apikey: apiKey
      }
},
function(error, response, body) {

var bod = JSON.parse(body);

console.log(bod);

}
);
