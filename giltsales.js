var mongoose =       require('mongoose'),
    request =        require('request'),
    Sale =           require('../flashsalecalendar/models/sale.js');

    function saveCheck(err, data){
      if (err) {
        console.log('mongo save error');
      } else {
        console.log('check');
      }
    }

    //GILT DATA
    var apiKey = "e0f5b85f64d239a5945fede8a95a3ddce8d6e952cef546b371b3b7b3ca213468";
    request.get({
    url: 'https://api.gilt.com/v1/sales/active.json',
    headers: {
            apikey: apiKey
          }
    },
    function(error, response, body) {

var bod = JSON.parse(body);

console.log('number of sales');
console.log(bod.sales.length);

console.log(bod.sales[0].name)
console.log(bod.sales[0].products.length);

for (j=0;j<bod.sales[0].products.length; j+=1){

request.get({
  url: bod.sales[0].products[j],
  headers: {
          apikey: apiKey
            }
          },
          function(error, response, body) {
            var item = JSON.parse(body);
            // console.log(item.name);
            // console.log(item.url);
            // console.log(item.image_urls['91x121'][0].url);
            //
            // console.log(item.skus[0].msrp_price);
            // console.log(item.skus[0].sale_price);
            // console.log(item.skus[0].inventory_status);

              // for (k=0; k<item.skus.length;k+=1){
              //   console.log(item.skus[k].msrp_price);
              //   console.log(item.skus[k].sale_price);
              //   console.log(item.skus[k].inventory_status);
              // }

              function saveCheck(err, data){
                console.log('checking');
                if (err) {
                } else {
                }
              }

              var newSale = new Sale({
                sale_name: bod.sales[0].name,
                item_name: item.name,
                item_link: item.url,
                item_picture: item.image_urls['91x121'][0].url,
                msrp_price: item.skus[0].msrp_price,
                sale_price: item.skus[0].sale_price,
                inventory_status: item.skus[0].inventory_status
                              });
              newSale.save(function(error, data){saveCheck(err, data)
              });
          })
      }
  }


        // res.send({
        //   n: names,
        //   d: dates,
        //   })
    );
