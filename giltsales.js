var mongoose =       require('mongoose'),
    request =        require('request'),
    Sale =           require('./models/sale.js');

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

var salesLength = bod.sales.length;

console.log(bod);

for (var i=1;i<salesLength;i+=1) {

(function(i){
setTimeout(function(){

console.log(i);
while (!bod.sales[i].products) {
console.log('I found a sale with no products');
i+=1;
}

for (var j=0;j<bod.sales[i].products.length; j+=1){

console.log(bod.sales[i].products[j]);

request.get({
  url: bod.sales[i].products[j],
  headers: {
          apikey: apiKey
            }
          },
          function(error, response, body) {

            console.log('request made');
            var item = JSON.parse(body);
            console.log(item);

              function saveCheck(err, data){
                console.log('checking');
                if (err) {
                } else {
                }
                }

              if (item.name.length > 33) {
                item.name = item.name.slice(0,29)+'...'
              }

              if (item.name.length < 33) {
                item.name = item.name
              }

              var percentDiscount = (item.skus[0].msrp_price - item.skus[0].sale_price)/item.skus[0].msrp_price*100;
              // console.log(percentDiscount);

              var inventoryStatus = null
              if (item.skus[0].inventory_status === 'for sale') {
                inventoryStatus = true;
              } else {
                inventoryStatus = false
              };
              // console.log(inventoryStatus);

              var startDate = new Date(bod.sales[i].begins)
              var endDate = new Date(bod.sales[i].ends)
              var daysOld = (endDate.valueOf() - startDate.valueOf())/(24*60*60*1000);

              var a = null;
              var oldUnitsforSale = null;
              var unitsSoldPastDay = null;

              // Sale.find({ "item_sku" : item.skus[0].id, "date_added" :{ $lte : new Date()}}, function (err, sale) {
              //   if (err) {
              //     console.log(err);
              //   } else {
              //     a = sale[0];
              //     console.log(a);
              //     if (!a.units_for_sale){
              //     oldUnitsforSale = 0;
              //   }
              //   else {
              //     oldUnitsforSale = a.units_for_sale;
              //
              //   console.log(oldUnitsforSale);
              //   }
              //     // console.log(oldUnitsforSale);
              //     unitsSoldPastDay = (item.skus[0].units_for_sale) - oldUnitsforSale;
              //     console.log(unitsSoldPastDay);
              //     }
              // });



              var newSale = new Sale({
                date_added: new Date(),
                start_date: startDate,
                end_date: endDate,
                days_old: daysOld,
                sale_name: bod.sales[i].name,
                sale_store: bod.sales[i].store,
                item_name: item.name,
                item_sku: item.skus[0].id,
                item_brand: item.brand,
                item_link: item.url,
                item_picture: item.image_urls['91x121'][0].url,
                item_picture_medium: item.image_urls['300x400'][0].url,
                msrp_price: item.skus[0].msrp_price,
                sale_price: item.skus[0].sale_price,
                percent_discount: percentDiscount,
                inventory_status: inventoryStatus,
                units_for_sale: item.skus[0].units_for_sale,
                // units_sold_past_day: unitsSoldPastDay,
                categories: item.categories
              });

              if (newSale.inventory_status === true) {
              newSale.save(function(error, data){
                console.log('saving');
              if (err) {console.log('error')}
              });
            }
          })
        }

      }, 5000 * i);
        }(i));
    }
  }, function() {
    db.close();
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
