var mongoose =       require('mongoose'),
    request =        require('request'),
    Sale =           require('../flashsalecalendar/models/sale.js');

var MONGOURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/flashsalecalendar';

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

              var percentDiscount = (item.skus[0].msrp_price - item.skus[0].sale_price)/item.skus[0].msrp_price*100;
              console.log(percentDiscount);

              var inventoryStatus = null
              if (item.skus[0].inventory_status === 'for sale') {
                inventoryStatus = true;
              } else {
                inventoryStatus = false
              };
              console.log(inventoryStatus);

              var startDate = new Date(bod.sales[0].begins)
              var endDate = new Date(bod.sales[0].ends)
              var daysOld = (startDate.valueOf() - endDate.valueOf())/(24*60*60*1000);

              var newSale = new Sale({
                start_date: startDate,
                end_date: endDate,
                days_old: daysOld,
                sale_name: bod.sales[0].name,
                sale_store: bod.sales[0].store,
                item_name: item.name,
                item_brand: item.brand,
                item_link: item.url,
                item_picture: item.image_urls['91x121'][0].url,
                msrp_price: item.skus[0].msrp_price,
                sale_price: item.skus[0].sale_price,
                percent_discount: percentDiscount,
                inventory_status: inventoryStatus,
                categories: item.categories
              });

              newSale.save(function(error, data){
              if (err) {console.log('error')}
              });
          })
      }
  }

    );


    mongoose.connect(MONGOURI);
    var db = mongoose.connection;

    db.on('error', function () {
      console.log("Database errors!");
    });

    db.once('open', function() {
        console.log('db up');
    });
