var express =        require('express'),
    app =            express(),
    ejs =            require('ejs'),
    bodyParser =     require('body-parser'),
    methodOverride = require('method-override'),
    expressLayouts = require('express-ejs-layouts'),
    morgan =         require('morgan'),
    mongoose =       require('mongoose'),
    session =        require('express-session'),
    request =        require('request'),
    Sale =           require('../flashsalecalendar/models/sale.js');

var PORT = process.env.PORT || 1337;
var MONGOURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/flashsalecalendar';

app.use(express.static(__dirname));

app.get('/', function(req, res){

  request.get({
    url: 'https://app.cloudscrape.com/api/runs/ebd112a0-9855-417b-ba92-6017c7363926/latest/result',
    headers: {
      'X-CloudScrape-Access': 'f994895fd66b203b92243f8bc3f70d97',
      'X-CloudScrape-Account': '365db7d8-9186-4389-8c28-5666bf523010',
      'Accept': 'application/json',
      'Host': 'app.cloudscrape.com',
      'User-Agent': 'YourApp/1.0',
    }
  },
  function(error,response,body){

      console.log(body);
  }
  )

  var apiKey = "e0f5b85f64d239a5945fede8a95a3ddce8d6e952cef546b371b3b7b3ca213468";

  request.get({
  url: 'https://api.gilt.com/v1/sales/men/upcoming.json',
  headers: {
          apikey: apiKey
    }
  },
  function(error, response, body) {

    function saveCheck(err, data){
      console.log('checking');
      if (err) {
      } else {

      }
    }

var bod = JSON.parse(body);
var sales = bod.sales;

var names = [];
var dates = [];
var ss = [];

      if(sales instanceof Array){
          for(var i=0; i<sales.length;i++){
            var beg = new Date(sales[i].begins);
            // var begDay = beg.getDay();
            // var begMonth = beg.getMonth();
            // var begYear = beg.getFullYear();
            // var begTime = beg.getHours();
            //
            // dates.push(begDay+" "+begMonth+" "+begYear+" "+ begTime);
            dates.push(beg.toString());
            var name = sales[i].name;
            names.push(name);
            var newSale = new Sale({
                            title: name,
                            date: beg
                            });
            // newSale.save(function(error, data){saveCheck(err, data)
            // });
        }
      }
      // res.render('index.ejs', {data: sales});
      res.send({
        n: names,
        d: dates,
        })
  });
})

mongoose.connect(MONGOURI);
var db = mongoose.connection;

db.on('error', function () {
  console.log("Database errors!");
});

db.once('open', function() {
    console.log('db up');
  app.listen(PORT,function() {
    console.log('1337');
  });
});
